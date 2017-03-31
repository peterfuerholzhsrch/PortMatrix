import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Project} from './model/project';
import {CommonRestService} from './common-rest.service';
import {SessionStorageService} from './session-storage.service';


/**
 * REST service for handling projects.
 */
@Injectable()
export class ProjectService extends CommonRestService {

  private static PROJECTS_URL = '/api/projects';

  /**
   * @param http injected service
   * @param sessionStorageService injected service
   */
  constructor(http: Http,
              sessionStorageService: SessionStorageService) {
    super(http, sessionStorageService);
  }


  /**
   * @param userId
   * @param assignedToo false: returns only the project where set user is owner (currently 1:1); true: return projects
   * where this user is assigned (= acknowledged invitation)
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  getProjectsByUserId(userId: string, assignedToo: boolean): Promise<Array<Project>> {
    return this
      .get(`${ProjectService.PROJECTS_URL}?userId=${userId}&assignedToo=${assignedToo}`)
      .toPromise()
      .then(response => {
        return Project.jsonArrToObjArr(response.json().data);
      })
      .catch(CommonRestService.handleError);
  }


  /**
   * @param projectId
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  getProject(projectId: string): Promise<Project> {
    return this
      .get(`${ProjectService.PROJECTS_URL}/${projectId}`)
      .toPromise()
      .then(response => {
        return Project.jsonToObj(response.json());
      })
     .catch(CommonRestService.handleError);
  }


  /**
   * TODO This method is currently unused.
   *
   * Currently we have not any properties to update by the UI side. In the future there might be:
   * - configurable set of network switching states
   * - configurable set of zones
   * - configurable set of systems
   * - configurable set of protocols
   * All those settings could be saved on the project.
   *
   * @param project
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  updateProject(project: Project): Promise<Project> {
    const url = `${ProjectService.PROJECTS_URL}/${project.getId()}`;
    return this
      .put(url, project)
      .toPromise()
      .then(response => {
        return Project.jsonToObj(response.json());
      })
      .catch(CommonRestService.handleError);
  }
}
