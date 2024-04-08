import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { omit } from 'lodash';

import {
  Accordion,
  FilterAccordionHeader,
} from '@folio/stripes/components';

import { DateRangeFilter } from '../../../../SearchAndSort/components';
import useLocaleDateFormat from '../hooks';
import { FilterAccordion } from '../FilterAccordion';

const DATE_FORMAT = 'YYYY-MM-DD';

const retrieveDatesFromDateRangeFilterString = (filterValue, dateFormat) => {
  let dateRange = {
    startDate: '',
    endDate: '',
  };

  if (filterValue) {
    const [startDateString, endDateString] = filterValue.split(':');
    const endDate = moment.utc(endDateString);
    const startDate = moment.utc(startDateString);

    dateRange = {
      startDate: startDate.isValid()
        ? startDate.format(dateFormat)
        : '',
      endDate: endDate.isValid()
        ? endDate.format(dateFormat)
        : '',
    };
  }

  return dateRange;
};

const CustomFieldsDateRangeFilter = ({
  activeFilters,
  closedByDefault,
  disabled,
  id,
  label,
  labelId,
  name,
  onChange,
  dateFormat,
  showBasicAccordion,
  onClearFilter,
  filterNameBasic,
  ...rest
}) => {
  const stripesDateFormat = useLocaleDateFormat();
  const localeDateFormat = useMemo(
    () => dateFormat || stripesDateFormat,
    [stripesDateFormat, dateFormat],
  );

  const filterValue = activeFilters?.[0];
  const selectedValues = useMemo(() => {
    return retrieveDatesFromDateRangeFilterString(filterValue, localeDateFormat);
  }, [filterValue, localeDateFormat]);

  const makeDateRangeFilterString = useCallback((startDate, endDate) => {
    const startDateBackend = moment.utc(startDate, localeDateFormat).format(DATE_FORMAT);
    const endDateBackend = moment.utc(endDate, localeDateFormat).format(DATE_FORMAT);

    return `${startDateBackend}:${endDateBackend}`;
  }, [localeDateFormat]);


  if (showBasicAccordion) {
    return (
      <Accordion
        displayClearButton
        id={`filter-accordion-custom-field-${id}`}
        header={FilterAccordionHeader}
        label={labelId}
        separator={false}
        onClearFilter={() => onClearFilter(filterNameBasic)}
      >
        <DateRangeFilter
          name={name}
          selectedValues={selectedValues}
          onChange={onChange}
          makeFilterString={makeDateRangeFilterString}
          dateFormat={localeDateFormat}
          {...rest}
        />
      </Accordion>
    );
  }

  return (
    <FilterAccordion
      activeFilters={activeFilters}
      closedByDefault={closedByDefault}
      disabled={disabled}
      id={id}
      label={label}
      labelId={labelId}
      name={name}
      onChange={onChange}
    >
      <DateRangeFilter
        name={name}
        selectedValues={selectedValues}
        onChange={onChange}
        makeFilterString={makeDateRangeFilterString}
        dateFormat={localeDateFormat}
        {...rest}
      />
    </FilterAccordion>
  );
};

CustomFieldsDateRangeFilter.propTypes = {
  ...omit(DateRangeFilter.propTypes, 'selectedValues', 'makeFilterString'),
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  closedByDefault: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  labelId: PropTypes.string,
  onClearFilter: PropTypes.func,
  filterNameBasic: PropTypes.string,
};

CustomFieldsDateRangeFilter.defaultProps = {
  closedByDefault: true,
  disabled: false,
};

export default CustomFieldsDateRangeFilter;
