import PropTypes from 'prop-types';
import { memo } from 'react';
import { useIntl } from 'react-intl';

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
}) => {
  const FilterComponent = customFieldTypeToFilterMap[customField.type];
  const { refId, name, selectField } = customField;
  const values = selectField?.options?.values ?? [{ id: 'true', value: name }];
  const filterName = `${FILTERS.CUSTOM_FIELDS}.${refId}`;
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

  return (
    <FilterAccordion
      activeFilters={activeFilters}
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
        selectedValues={activeFilters}
        onChange={onChange}
      />
    </FilterAccordion>
  );
};

CustomFieldsFilter.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  closedByDefault: PropTypes.bool,
  customField: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

CustomFieldsFilter.defaultProps = {
  closedByDefault: true,
  disabled: true,
};

export default memo(CustomFieldsFilter);
