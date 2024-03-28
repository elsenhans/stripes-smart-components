import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { getLocaleDateFormat } from '@folio/stripes/components';

function useLocaleDateFormat() {
  const intl = useIntl();

  return useMemo(
    () => getLocaleDateFormat({ intl }),
    [intl],
  );
}

export default useLocaleDateFormat;
