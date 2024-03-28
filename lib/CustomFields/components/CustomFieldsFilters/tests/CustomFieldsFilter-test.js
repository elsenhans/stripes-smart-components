import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import { setupApplication } from '../../../../../tests/helpers';

import CustomFieldsFilters from '../CustomFieldsFilters';
import CustomFieldsFilter from '../CustomFieldsFilter';
import CustomFieldsFiltersInteractor from './interactor';

const onChangeHandler = sinon.spy();

const CUSTOM_FIELDS = [
  {
    id: 'bb9bae41-cb8b-430f-8912-616415294cce',
    type: 'DATE_PICKER',
    name: 'Datepicker',
    refId: 'datepicker',
  },
  {
    id: '6ce5cc69-9ca8-4024-9bd4-65c4e5927dfe',
    type: 'TEXTBOX_SHORT',
    name: 'Long text',
    refId: 'longtext',
  },
  {
    id: '6cd18404-a21a-4dd9-80ce-c3fa463fdf95',
    type: 'TEXTBOX_LONG',
    name: 'Short text',
    refId: 'shorttext',
    entityType: 'users'
  },
  {
    id: '98da725c-7f07-48e1-b15b-4b53065f67d7',
    type: 'MULTI_SELECT_DROPDOWN',
    name: 'Multiselect',
    refId: 'multiselect',
    entityType: 'users',
    selectField: {
      multiSelect: true,
      options: {
        values: [
          { id: 'opt_0', value: 'a', default: false },
          { id: 'opt_1', value: 'b', default: false },
        ],
      },
    },
  },
  {
    id: '2bd9a821-d550-40b0-81f9-71ad28fe2922',
    type: 'SINGLE_SELECT_DROPDOWN',
    name: 'Singleselect',
    refId: 'singleselect',
    entityType: 'users'
  },
];

const CUSTOM_FIELD = {
  id: '98da725c-7f07-48e1-b15b-4b53065f67d7',
  type: 'MULTI_SELECT_DROPDOWN',
  name: 'Multiselect',
  refId: 'multiselect',
  entityType: 'users',
  selectField: {
    multiSelect: true,
    options: {
      values: [
        { id: 'opt_0', value: 'a', default: false },
        { id: 'opt_1', value: 'b', default: false },
      ],
    },
  },
};

const activeFilters = {};

const CustomFieldsFiltersComponent = (props) => {
  return (
    <CustomFieldsFilters
      activeFilters={activeFilters}
      customFields={CUSTOM_FIELDS}
      disabled={false}
      id='customFields'
      name='customFields'
      onChange={onChangeHandler}
      {...props}
    >
      <CustomFieldsFilter
        activeFilters={activeFilters}
        customFields={CUSTOM_FIELD}
        key={`custom-field-${CUSTOM_FIELD.id}`}
        onChange={onChangeHandler}
        {...props}
      />
    </CustomFieldsFilters>
  );
};

const customFieldsFilters = new CustomFieldsFiltersInteractor();

describe('CustomFieldsFilters', () => {
  beforeEach(async () => {
    onChangeHandler.resetHistory();
  }); 

  describe('rendering', () => {
    setupApplication({
      component: (
        <CustomFieldsFiltersComponent />
      )
    });

    it('should render multiselect filter', () => {
      expect(customFieldsFilters.multiselectFilterIsPresent).to.be.true;
    });
  });
});
