/**
 * Model for System environments.
 */
enum SystemEnvironment {
  DEVELOPMENT_SYSTEM,
  TEST_SYSTEM,
  INTEGRATION_SYSTEM,
  PRODUCTION_SYSTEM
}

const SYSTEM_ENVIRONMENTS = [
  SystemEnvironment.DEVELOPMENT_SYSTEM,
  SystemEnvironment.TEST_SYSTEM,
  SystemEnvironment.INTEGRATION_SYSTEM,
  SystemEnvironment.PRODUCTION_SYSTEM];

namespace SystemEnvironment {

  export function getCssClass(system: SystemEnvironment) {
    return SystemEnvironment.text(system).toLowerCase();
  }


  export function text(system: SystemEnvironment) {
    return SystemEnvironment[system].toString();
  }


  export function getIndex(systemString: string): number {
    const foundIdx = SYSTEM_ENVIRONMENTS.find(idx => systemString == SystemEnvironment[idx].toString());
    return foundIdx;
  }
}


export {
  SystemEnvironment,
  SYSTEM_ENVIRONMENTS
};

