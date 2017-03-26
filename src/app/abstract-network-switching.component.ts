import {Log} from 'ng2-logger/ng2-logger';
import {Networkswitching} from "./model/networkswitching";
import {SystemEnvironment, SYSTEM_ENVIRONMENTS} from './model/systemEnvironment';
import {EditNetworkSwitchingComponent} from "./edit-network-switching/edit-network-switching.component";
import {Router, ActivatedRoute} from "@angular/router";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {DialogService} from "ng2-bootstrap-modal";
import {NetworkswitchingService} from "./networkswitching.service";
import {UserManagementService} from "./user-management.service";


/**
 * AbstractNetworkSwitchingComponent is the base class for handling NetworkSwitchings. Thus we reduce code duplication.
 *
 * Created by pfu on 25/03/17.
 */
export abstract class AbstractNetworkSwitchingComponent {

  private aLog = Log.create('abstract-network-switching');

  protected nwsw: Networkswitching;
  protected errormessage: string;

  // Used by template:

  protected ZONES = Networkswitching.ZONES;
  protected STATES = Networkswitching.STATES;
  protected PROTOCOLS = Networkswitching.PROTOCOLS;
  protected SYSTEM_ENVIRONMENTS = SYSTEM_ENVIRONMENTS.map(system => SystemEnvironment.text(system));
  protected HOST_REGEX: string = Networkswitching.HOST_REGEX;
  protected IP_RANGE_REGEX: string = Networkswitching.IP_RANGE_REGEX;


  constructor(protected networkswitchingService: NetworkswitchingService,
              protected userManagementService: UserManagementService,
              protected dialogService: DialogService,
              protected route: ActivatedRoute,
              protected router: Router
  ) {
  }

  protected setErrormessage(error) {
    this.errormessage = error.message || error;
  }

  getErrormessage(): string {
    return this.errormessage;
  }


  isProtocolSelected(protocol: string): boolean {
    return !!this.nwsw.protocol.find(selProtocol => selProtocol === protocol);
  }

  updateProtocolList(options) {
    // option is not a JS array -> filter() cannot be used!
    const selectedOptionList = [];
    for (const option of options) {
      if (option.selected) {
        selectedOptionList.push(option);
      }
    }
    const selectedProtocolList = selectedOptionList.map(option => option.text);

    this.aLog.d("selected protocol options: ", selectedProtocolList);
    this.nwsw.protocol = selectedProtocolList;
  }


  showInfoOnProtocolSelect() {
    this.dialogService.addDialog(AlertDialogComponent,
      { title: "Protocol Settings",
        message: EditNetworkSwitchingComponent.PROTOCOL_SETTINGS_HELP_MESSAGE },
      { closeByClickingOutside: true });
  }


  goBack(): void {
    this.router.navigate(['./nwsw', this.userManagementService.getProjectId()]);
  }
}
