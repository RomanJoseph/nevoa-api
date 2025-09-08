//@ts-nocheck
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { ObjectLiteral } from 'typeorm';
import { DateTime } from 'luxon';
import { UnprocessableEntityException } from '@nestjs/common';

type ParamValue = string | number | Array<string | number>;

export interface IFilter {
  filterBy: string[];
  filterType: string[];
  filterValue: string[];
}

export interface ISingleFilter {
  filterBy: string;
  filterType: string;
  filterValue: string;
}

export const FilterTypes = {
  EQ: 'eq',
  NOT: 'not',
  NOT_IN: 'not_in',
  IN: 'in',
  LIKE: 'like',
  GE: 'ge',
  LE: 'le',
  BTW: 'btw',
  IS_NULL: 'is_null',
};

export default class WhereBuilder<Entity extends ObjectLiteral> {
  private params: Record<string, ParamValue> = {};
  private paramsCount = 0;

  constructor(
    private readonly queryBuilder: SelectQueryBuilder<Entity>,
    private readonly filter: IFilter,
    private readonly alias: string,
  ) {}

  build(): SelectQueryBuilder<Entity> {
    const filterLength = this.filter?.filterBy?.length;

    if (!filterLength) {
      return this.queryBuilder;
    }

    for (let i = 0; i < filterLength; i += 1) {
      let currentAlias = this.alias;
      let filterBy = this.filter.filterBy[i];

      if (filterBy.includes('.')) {
        const split = filterBy.split('.');
        const splitLength = split.length;

        let relationPath = this.alias;

        for (let j = 0; j < splitLength - 1; j += 1) {
          const relation = split[j];
          const nextAlias = `${relation}_${j}`;

          const hasJoin = this.queryBuilder.expressionMap.joinAttributes.some(
            (join) => join.alias.name === nextAlias,
          );

          if (!hasJoin) {
            this.queryBuilder.leftJoinAndSelect(
              `${relationPath}.${relation}`,
              nextAlias,
            );
          }

          relationPath = nextAlias;
        }

        currentAlias = relationPath;
        filterBy = split[splitLength - 1];
      }

      if (this.filter.filterType[i] === FilterTypes.IS_NULL) {
        this.queryBuilder.andWhere(`${currentAlias}.${filterBy} IS NULL`);
        continue;
      }

      this.queryBuilder.andWhere(
        this.buildFilter(
          {
            filterBy: filterBy,
            filterType: this.filter.filterType[i].toLowerCase(),
            filterValue: this.filter.filterValue[i],
          },
          currentAlias,
        ),
        this.params,
      );
    }
    return this.queryBuilder;
  }

  private buildFilter(filter: ISingleFilter, alias: string): string {
    const columnIdentifier = `${alias}.${filter.filterBy}`;

    this.paramsCount += 1;
    const paramName = `${filter.filterBy.replace('.', '_')}_${this.paramsCount}`;
    const paramAuxName = `${paramName}_aux`;

    const whereColumn = this.canConvertToLower(filter.filterValue)
      ? columnIdentifier
      : `LOWER(${columnIdentifier})`;

    const filterValue = this.canConvertToLower(filter.filterValue)
      ? filter.filterValue
      : filter.filterValue.toLowerCase();

    switch (filter.filterType) {
      case FilterTypes.EQ:
        this.params[paramName] = filterValue;
        return `${whereColumn} = :${paramName}`;

      case FilterTypes.NOT:
        this.params[paramName] = filterValue;
        return `${whereColumn} != :${paramName}`;

      case FilterTypes.IN:
        const inValues = filter.filterValue.split('|');
        this.params[paramName] = inValues;
        return inValues.length > 0
          ? `${columnIdentifier} IN (:...${paramName})`
          : '1=0'; // No values, so nothing can match

      case FilterTypes.LIKE:
        // LIKE is case-insensitive in PostgreSQL with ILIKE, but for broader compatibility, we use LOWER.
        this.params[paramName] = `%${filter.filterValue.toLowerCase()}%`;
        return `LOWER(CAST(${columnIdentifier} AS TEXT)) LIKE :${paramName}`;

      case FilterTypes.GE:
        this.params[paramName] = filter.filterValue;
        return `${columnIdentifier} >= :${paramName}`;

      case FilterTypes.LE:
        this.params[paramName] = filter.filterValue;
        return `${columnIdentifier} <= :${paramName}`;

      case FilterTypes.BTW:
        const [start, end] = filter.filterValue.split('|');
        this.params[paramName] = start;
        this.params[paramAuxName] = end;
        return `${columnIdentifier} BETWEEN :${paramName} AND :${paramAuxName}`;

      case FilterTypes.NOT_IN:
        const notInValues = filter.filterValue.split('|');
        this.params[paramName] = notInValues;
        return notInValues.length > 0
          ? `${columnIdentifier} NOT IN (:...${paramName})`
          : '1=1'; // No values, so everything matches
      default:
        throw new UnprocessableEntityException(
          `Unknown filter type: ${filter.filterType}!`,
        );
    }
  }

  /**
   * Checks if a value should be treated as a type that doesn't need `LOWER()`.
   * This includes dates, numbers, UUIDs, booleans, etc.
   * @param value The string value from the filter.
   * @returns boolean
   */
  private canConvertToLower(value: string): boolean {
    if (value === null || value === undefined) return true;

    const isValidDate = DateTime.fromFormat(value, 'yyyy-MM-dd').isValid;

    const isValidNumber = !isNaN(parseFloat(value)) && isFinite(Number(value));

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isValidUUID = uuidRegex.test(value);

    const lowercasedValue = value.toLowerCase();
    const isValidBoolean =
      lowercasedValue === 'true' || lowercasedValue === 'false';

    const isMultiValue = value.includes('|');

    const isEnum = ['automatic', 'manual'].includes(lowercasedValue);

    return (
      isValidDate ||
      isValidNumber ||
      isValidUUID ||
      isValidBoolean ||
      isMultiValue ||
      isEnum
    );
  }
}
