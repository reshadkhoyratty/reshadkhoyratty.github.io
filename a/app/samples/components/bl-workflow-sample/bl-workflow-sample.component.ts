import {Component, EventEmitter, OnInit} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlWorkflowObject} from "../../../../../../../libs/shared-ui/src/lib/models/bl-workflow-object";
import {FormGroup} from "@angular/forms";
import {IconClassEnum} from "@esedit-md/shared-ui";
import {WorkflowEtatEnum} from "../../../../../../../libs/shared-ui/src/lib/enums/WorkflowEtatEnum";

@Component({
  selector: 'bl-workflow-sample',
  templateUrl: './bl-workflow-sample.component.html'
})
export class BlWorkflowSampleComponent implements OnInit {

  public workflowConfig: BlWorkflowObject[] = [];
  FormGroup: FormGroup;
  private eventNotify = new EventEmitter()

  constructor(public toasterService: ToasterService) {

    const bl_workflow_1: BlWorkflowObject = {
      titre: "Titre1",
      etat: WorkflowEtatEnum.COMPLETEE,
      description: "Description concise",
      element: {
        elmentType: "bl-button",
        elementTitre: "bl-button.search",
        elementTestLabel: "button_search",
        elementEvent: this.eventNotify,
        //elementClass: "primary"
      }
    }
    const bl_workflow_2: BlWorkflowObject = {
      titre: "Titre2",
      etat: WorkflowEtatEnum.ACTUELLE ,
      element: {
        elmentType: "bl-hyperlink",
        elementTitre: "Lien vers sous menu",
        elementTestLabel: "lien_menu",
        elementLink: "/components/hyperlink",
      }
    }
    const bl_workflow_3: BlWorkflowObject = {
      titre: "Titre3",
      etat: WorkflowEtatEnum.ERREUR,
      description: "Description concise",

      element: {
        elmentType: "label",
        elementTitre: "Default",
        elementTestLabel: "label",
        elementClass: "label-default",
      }
    }
    const bl_workflow_4: BlWorkflowObject = {
      titre: "Titre4",
      etat: WorkflowEtatEnum.NONCOMPLETEE,
      description: `<p><i>Description concise1</i></p>
        <p style="color: red">Description concise2</p>
        <p style="font-size: 12px">Description concise3</p>
        <p>Description concise4</p>`,

      element: {
        elmentType: "label",
        elementTitre: "primary",
        elementTestLabel: "label",
        elementClass: "label-primary",
      }
    }
    const bl_workflow_5: BlWorkflowObject = {
      titre: `<p>Titre5</p><p>Deuxieme ligne de titre </p><p>Troisième ligne de titre </p>`,
      etat: WorkflowEtatEnum.OPTIONNEL ,
      description: "Description concise",
      element: {
        elmentType: "bl-button",
        elementTitre: "bl-button.validate",
        elementTestLabel: "button_Validate",
        elementIconClass: IconClassEnum.validate,
        elementEvent: this.eventNotify,
        //elementClass: "primary"
      }
    }
    const bl_workflow_6: BlWorkflowObject = {
      titre: "Titre6",
      etat: WorkflowEtatEnum.OPTIONNEL,
      description: "Description concise",
    }
    this.workflowConfig.push(bl_workflow_1, bl_workflow_2, bl_workflow_3, bl_workflow_4, bl_workflow_5, bl_workflow_6);
  }

  ngOnInit(): void {
    this.eventNotify.subscribe(() => {
      this.notify();
    });
  }

  private notify() {
    this.toasterService.success("En Cours ....."  );
  }
}
