import PropTypes from 'prop-types';
import { memo } from 'react';
import { useIntl } from 'react-intl';

import {
  Accordion,
  FilterAccordionHeader,
} from '@folio/stripes/components';

import {
  CheckboxFilter,
  DateRangeFilter,
  MultiSelectionFilter,
} from '../../../SearchAndSort/components';

import { CustomFieldsDateRangeFilter } from './CustomFieldsDateRangeFilter';
import { FilterAccordion } from './FilterAccordion';

const FILTERS = {
  CUSTOM_FIELDS: 'customFields',
};

// Map custom field types to specific filters
const customFieldTypeToFilterMap = {
  DATE_PICKER: DateRangeFilter,
  MULTI_SELECT_DROPDOWN: MultiSelectionFilter,
  RADIO_BUTTON: CheckboxFilter,
  SINGLE_CHECKBOX: CheckboxFilter,
  SINGLE_SELECT_DROPDOWN: MultiSelectionFilter,
};

const CustomFieldsFilter = ({
  activeFilters,
  closedByDefault,
  customField,
  disabled,
  onChange,
  onClearFilter,
  showBasicAccordion,
}) => {
  const FilterComponent = customFieldTypeToFilterMap[customField.type];
  const { refId, name, selectField } = customField;
  const values = selectField?.options?.values ?? [{ id: 'true', value: name }];
  const filterName = `${FILTERS.CUSTOM_FIELDS}.${refId}`;
  const filterNameBasic = `${FILTERS.CUSTOM_FIELDS}-${refId}`;
  const dataOptions = values.map(({ id: value, value: label }) => ({
    label,
    value,
  }));

  const intl = useIntl();

  const customFieldLabel = intl.formatMessage({ id: 'stripes-smart-components.customFields' });
  const fieldLabel = `${customFieldLabel} ${name}`;

  if (!FilterComponent) {
    return null;
  }

  if (FilterComponent === DateRangeFilter) {
    return (
      <CustomFieldsDateRangeFilter
        activeFilters={activeFilters}
        disabled={disabled}
        id={filterName}
        labelId={fieldLabel}
        name={filterName}
        onChange={onChange}
      />
    );
  }

  if (showBasicAccordion) {
    return (
      <Accordion
        displayClearButton
        id={`users-filter-accordion-custom-field-${refId}`}
        header={FilterAccordionHeader}
        label={name}
        separator={false}
        onClearFilter={() => onClearFilter(filterNameBasic)}
      >
        <FilterComponent
          dataOptions={dataOptions}
          name={filterNameBasic}
          selectedValues={activeFilters[`${FILTERS.CUSTOM_FIELDS}-${customField.refId}`]}
          onChange={onChange}
          aria-labelledby={`users-filter-accordion-custom-field-${refId}`}
        />
      </Accordion>
    );
  }

  return (
    <FilterAccordion
      activeFilters={activeFilters[`${FILTERS.CUSTOM_FIELDS}.${customField.refId}`]}
      closedByDefault={closedByDefault}
      disabled={disabled}
      id={filterName}
      labelId={fieldLabel}
      name={filterName}
      onChange={onChange}
    >
      <FilterComponent
        dataOptions={dataOptions}
        disabled={disabled}
        name={filterName}
        selectedValues={activeFilters[`${FILTERS.CUSTOM_FIELDS}.${customField.refId}`]}
        onChange={onChange}
      />
    </FilterAccordion>
  );
};

CustomFieldsFilter.propTypes = {
  activeFilters: PropTypes.object,
  closedByDefault: PropTypes.bool,
  customField: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  showBasicAccordion: PropTypes.bool,
  onClearFilter: PropTypes.func,
};

CustomFieldsFilter.defaultProps = {
  closedByDefault: true,
  disabled: true,
};

export default memo(CustomFieldsFilter);
