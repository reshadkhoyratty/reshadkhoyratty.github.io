import { BlAction, IconClassEnum } from '@esedit-md/shared-ui';

export const ACTION_DELETE: BlAction = {
  idAction: 'delete',
  disabled: false,
  hidden: false,
  label: 'sample.datatable.action.delete',
  idSelector: 'btn_grp_delete_elt',
  icon: {
    icon: IconClassEnum.delete,
    tooltip: 'sample.datatable.action.delete',
  },
  buttonType: 'mat-icon-button',
  confirmMessage: {
    title: 'sample.datatable.action.delete.confirm',
    closeButtonTxt: 'sample.datatable.action.confirm.btn.close',
    yesButtonTxt: 'sample.datatable.action.confirm.btn.delete',
    cancelButtonTxt: 'sample.datatable.action.confirm.btn.no',
    iconType: 'warning',
  },
};
export const ACTION_EXPORT: BlAction = {
  idAction: 'export',
  idSelector: 'btn_grp_export_elt',
  label: 'sample.datatable.action.excel',
  icon: {
    icon: IconClassEnum.export,
    tooltip: 'sample.datatable.action.excel',
  },
  buttonType: 'mat-icon-button',
};
export const ACTION_ADD: BlAction = {
  idAction: 'add',
  idSelector: 'btn_grp_add_elt',
  label: 'sample.datatable.action.add',
  icon: {
    icon: IconClassEnum.plus,
    tooltip: 'sample.datatable.action.add',
  },
  buttonType: 'mat-icon-button',
};
export const ACTION_CONTROL: BlAction = {
  idAction: 'control',
  idSelector: 'btn_grp_control_elt',
  label: 'sample.datatable.action.control',
  icon: {
    icon: IconClassEnum.gear,
    tooltip: 'sample.datatable.action.control',
  },
  buttonType: 'mat-stroked-button',
  buttonFix: true,
  primary: true,
};
export const ACTION_NOTIFY: BlAction = {
  idAction: 'notify',
  label: 'sample.datatable.action.notify',
  idSelector: 'btn_grp_notify_elt',
  icon: {
    icon: IconClassEnum.notify,
    tooltip: 'sample.datatable.action.notify',
  },
  buttonType: 'mat-stroked-button',
};
export const ACTION_DEACTIVATE: BlAction = {
  idAction: 'deactivate',
  idSelector: 'btn_grp_deactivate_elt',
  label: 'sample.datatable.action.deactivate',
  icon: {
    icon: IconClassEnum.invisible,
    tooltip: 'sample.datatable.action.deactivate',
  },
  buttonType: 'mat-stroked-button',
};
export const ACTION_ACTIVATE: BlAction = {
  idAction: 'activate',
  idSelector: 'btn_grp_activate_elt',
  label: 'sample.datatable.action.activate',
  icon: {
    icon: IconClassEnum.invisible,
    tooltip: 'sample.datatable.action.activate',
  },
  buttonType: 'mat-stroked-button',
};
export const ACTION_SAVE: BlAction = {
  idAction: 'save',
  idSelector: 'btn_grp_deactivate_elt',
  label: 'sample.split-button.event.save',
  buttonType: 'mat-stroked-button',
};
export const ACTION_SAVE_AS: BlAction = {
  idAction: 'saveAs',
  idSelector: 'btn_grp_deactivate_elt',
  label: 'sample.split-button.event.save-as',
  buttonType: 'mat-stroked-button',
};
export const ACTION_SAVE_COPY: BlAction = {
  idAction: 'saveCopy',
  idSelector: 'btn_grp_deactivate_elt',
  label: 'sample.split-button.event.save-copy',
  buttonType: 'mat-stroked-button',
};
export const ACTION_COPY: BlAction = {
  idAction: 'Copy',
  idSelector: 'btn_grp_deactivate_elt',
  label: 'sample.split-button.event.copy',
  icon: {
    icon: IconClassEnum.copy,
    tooltip: 'sample.datatable.action.copy',
  },
  buttonType: 'mat-stroked-button',
};
export const ACTION_MODIFY: BlAction = {
  idAction: 'Modify',
  idSelector: 'btn_grp_deactivate_elt',
  label: 'sample.split-button.event.modify',
  icon: {
    icon: 'ph ph-pencil-simple',
    tooltip: 'sample.datatable.action.modify',
  },
  buttonType: 'mat-stroked-button',
};
export const ACTION_TREE: BlAction = {
  idAction: 'Tree',
  idSelector: 'btn_grp_deactivate_elt',
  label: 'sample.split-button.event.tree',
  icon: {
    icon: 'ph ph-tree-structure',
    tooltip: 'sample.datatable.action.tree',
  },
  buttonType: 'mat-stroked-button',
};
export const ACTION_SAVE_AS_PDF: BlAction = {
  idAction: 'saveAsPdf',
  idSelector: 'btn_grp_deactivate_elt',
  label: 'sample.split-button.event.save-as-pdf',
  buttonType: 'mat-stroked-button',
};

export function getButtonInstance(button: BlAction) {
  const confirm = button.confirmMessage
    ? Object.assign({}, button.confirmMessage, {
        ...button.confirmMessage,
      })
    : undefined;
  return Object.assign({}, button, {
    ...button,
    confirmMessage: confirm,
    eventEmitter: {},
  });
}
