import { hoursAsInteger } from '../../../utils';

async function parse(context) {
  // Nothing to do
  if (!context.assets.tenant) return {};

  /* eslint-disable camelcase */
  const {
    session_lifetime,
    idle_session_lifetime,
    ...tenant
  } = context.assets.tenant;

  return {
    tenant: Object.assign(
      tenant,
      session_lifetime && hoursAsInteger('session_lifetime', session_lifetime),
      idle_session_lifetime && hoursAsInteger('idle_session_lifetime', idle_session_lifetime)
    )
  };
  /* eslint-enable camelcase */
}

async function dump(context) {
  const tenant = { ...context.assets.tenant || {} };

  // remove empty 'flags'
  if (tenant.flags && !Object.keys(tenant.flags).length) {
    delete tenant.flags;
  }

  return { tenant };
}


export default {
  parse,
  dump
};
