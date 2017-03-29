# User Tests

User tests have been made at different stages:

* During the 'UX: Usability Testing' lessions
* At the site were the tool shall be used (Swisscom)
* At Marco's company site

## Here are the findings mentioned at >1 site:
* Sorting on multiple columns is a nice feature. Nevertheless current implementation is not fully self-explanatory.
  _Remedy:_ We introduced a tooltip on sorting to help the user using this feature.
  (There is a tooltip on filtering as well since this feature is rather powerful as well which might get
  unnoticed.)
* The mobile view takes a lot of space. Most people prefer the table view.


## Findings from Marco's company:
* The users had some problems to install the application correctly on their notebook with the readme. They were confused,
because a lot of the installation of the PortMatrixServer is described in the PortMatrix. (_Remedy:_ There are links
from one readme to the other.)
* The validation of the IP-address / Hostname is confusing, because it shows a red sign, but at the same time is correct
because you only need 1 value. (Remedy needs further investigations since we would need special 'required' behaviour.)
* When leaving edit-/create-networkswitching confirm dialog is shown. Other events like reloading or closing the
tab is not checked.


## Swisscom's site
PortMatrix is thought to be used within different Swisscom departments.
Findings at the user's site:
* Since the requirements phase was very short some more investigations need be done. (There are several
reasons this has not been done earlier: E.g. data model may grow heavily but we are attending a front end cours!)
* What needs to be shown (and what to hide) on the browsing view is a point of discussion.
* The use of fields 'system' and 'environment' need more discussions.
* The use of colors and other markup need more investigation.
* It was suggested to change sorting sequence from ascending/descending to ascending/descending/disabled. Thus the
'Reset sortings' button would be optional.
