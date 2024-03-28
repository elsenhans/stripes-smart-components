import {
  count,
  interactor,
  isPresent,
} from '@bigtest/interactor';


export default interactor(class CustomFieldsFiltersInteractor {
  customFieldsFiltersCount = count('#customFields');

  multiselectFilterIsPresent = isPresent('#customFields.multiselect');
});
