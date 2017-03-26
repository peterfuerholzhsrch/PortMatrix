import {Networkswitching} from "../model/networkswitching";

describe('editNetworkSwitching', () => {
  it('should accept one hostaddress', () => {
    expect("test.test.ch").toMatch(Networkswitching.HOST_REGEX);
  });

  it('should not accept special characters', () => {
    expect("test@ test.ch").not.toMatch(Networkswitching.HOST_REGEX);
  });

  it('should accept one ip-address', () => {
    expect("192.200.0.10").toMatch(Networkswitching.IP_RANGE_REGEX);
  });

  it('should accept ip-address-range', () => {
    expect("192.200.0.10-20").toMatch(Networkswitching.IP_RANGE_REGEX);
  });

  it('should not accept special characters', () => {
    expect("192.200.0 20").not.toMatch(Networkswitching.IP_RANGE_REGEX);
  });
});
