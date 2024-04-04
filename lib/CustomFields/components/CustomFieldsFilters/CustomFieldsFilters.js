import PropTypes from 'prop-types';

import CustomFieldsFilter from './CustomFieldsFilter';

const FILTERS = {
  CUSTOM_FIELDS: 'customFields',
};

const CustomFieldsFilters = ({
  activeFilters,
  customFields,
  onChange,
  ...props
}) => {
  if (!customFields) return null;

  return customFields.map((customField) => (
    <CustomFieldsFilter
      activeFilters={activeFilters}
      customField={customField}
      key={`custom-field-${customField.id}`}
      onChange={onChange}
      {...props}
    />
  ));
};

CustomFieldsFilters.propTypes = {
  activeFilters: PropTypes.object,
  customFields: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
};

export default CustomFieldsFilters;
