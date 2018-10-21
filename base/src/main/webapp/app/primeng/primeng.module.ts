import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BaseButtonDemoModule } from './buttons/button/buttondemo.module';
import { BaseSplitbuttonDemoModule } from './buttons/splitbutton/splitbuttondemo.module';

import { BaseDialogDemoModule } from './overlay/dialog/dialogdemo.module';
import { BaseConfirmDialogDemoModule } from './overlay/confirmdialog/confirmdialogdemo.module';
import { BaseLightboxDemoModule } from './overlay/lightbox/lightboxdemo.module';
import { BaseTooltipDemoModule } from './overlay/tooltip/tooltipdemo.module';
import { BaseOverlayPanelDemoModule } from './overlay/overlaypanel/overlaypaneldemo.module';
import { BaseSideBarDemoModule } from './overlay/sidebar/sidebardemo.module';

import { BaseKeyFilterDemoModule } from './inputs/keyfilter/keyfilterdemo.module';
import { BaseInputTextDemoModule } from './inputs/inputtext/inputtextdemo.module';
import { BaseInputTextAreaDemoModule } from './inputs/inputtextarea/inputtextareademo.module';
import { BaseInputGroupDemoModule } from './inputs/inputgroup/inputgroupdemo.module';
import { BaseCalendarDemoModule } from './inputs/calendar/calendardemo.module';
import { BaseCheckboxDemoModule } from './inputs/checkbox/checkboxdemo.module';
import { BaseChipsDemoModule } from './inputs/chips/chipsdemo.module';
import { BaseColorPickerDemoModule } from './inputs/colorpicker/colorpickerdemo.module';
import { BaseInputMaskDemoModule } from './inputs/inputmask/inputmaskdemo.module';
import { BaseInputSwitchDemoModule } from './inputs/inputswitch/inputswitchdemo.module';
import { BasePasswordIndicatorDemoModule } from './inputs/passwordindicator/passwordindicatordemo.module';
import { BaseAutoCompleteDemoModule } from './inputs/autocomplete/autocompletedemo.module';
import { BaseSliderDemoModule } from './inputs/slider/sliderdemo.module';
import { BaseSpinnerDemoModule } from './inputs/spinner/spinnerdemo.module';
import { BaseRatingDemoModule } from './inputs/rating/ratingdemo.module';
import { BaseSelectDemoModule } from './inputs/select/selectdemo.module';
import { BaseSelectButtonDemoModule } from './inputs/selectbutton/selectbuttondemo.module';
import { BaseListboxDemoModule } from './inputs/listbox/listboxdemo.module';
import { BaseRadioButtonDemoModule } from './inputs/radiobutton/radiobuttondemo.module';
import { BaseToggleButtonDemoModule } from './inputs/togglebutton/togglebuttondemo.module';
import { BaseEditorDemoModule } from './inputs/editor/editordemo.module';

import { BaseGrowlDemoModule } from './messages/growl/growldemo.module';
import { BaseMessagesDemoModule } from './messages/messages/messagesdemo.module';
/*import { BaseToastDemoModule } from './messages/toast/toastdemo.module';*/
import { BaseGalleriaDemoModule } from './multimedia/galleria/galleriademo.module';

import { BaseFileUploadDemoModule } from './fileupload/fileupload/fileuploaddemo.module';

import { BaseAccordionDemoModule } from './panel/accordion/accordiondemo.module';
import { BasePanelDemoModule } from './panel/panel/paneldemo.module';
import { BaseTabViewDemoModule } from './panel/tabview/tabviewdemo.module';
import { BaseFieldsetDemoModule } from './panel/fieldset/fieldsetdemo.module';
import { BaseToolbarDemoModule } from './panel/toolbar/toolbardemo.module';
import { BaseGridDemoModule } from './panel/grid/griddemo.module';
import { BaseScrollPanelDemoModule } from './panel/scrollpanel/scrollpaneldemo.module';
import { BaseCardDemoModule } from './panel/card/carddemo.module';

import { BaseDataTableDemoModule } from './data/datatable/datatabledemo.module';
import { BaseTableDemoModule } from './data/table/tabledemo.module';
import { BaseDataGridDemoModule } from './data/datagrid/datagriddemo.module';
import { BaseDataListDemoModule } from './data/datalist/datalistdemo.module';
import { BaseDataScrollerDemoModule } from './data/datascroller/datascrollerdemo.module';
import { BasePickListDemoModule } from './data/picklist/picklistdemo.module';
import { BaseOrderListDemoModule } from './data/orderlist/orderlistdemo.module';
import { BaseScheduleDemoModule } from './data/schedule/scheduledemo.module';
import { BaseTreeDemoModule } from './data/tree/treedemo.module';
import { BaseTreeTableDemoModule } from './data/treetable/treetabledemo.module';
import { BasePaginatorDemoModule } from './data/paginator/paginatordemo.module';
import { BaseGmapDemoModule } from './data/gmap/gmapdemo.module';
import { BaseOrgChartDemoModule } from './data/orgchart/orgchartdemo.module';
import { BaseCarouselDemoModule } from './data/carousel/carouseldemo.module';
import { BaseDataViewDemoModule } from './data/dataview/dataviewdemo.module';

import { BaseBarchartDemoModule } from './charts/barchart/barchartdemo.module';
import { BaseDoughnutchartDemoModule } from './charts/doughnutchart/doughnutchartdemo.module';
import { BaseLinechartDemoModule } from './charts/linechart/linechartdemo.module';
import { BasePiechartDemoModule } from './charts/piechart/piechartdemo.module';
import { BasePolarareachartDemoModule } from './charts/polarareachart/polarareachartdemo.module';
import { BaseRadarchartDemoModule } from './charts/radarchart/radarchartdemo.module';

import { BaseDragDropDemoModule } from './dragdrop/dragdrop/dragdropdemo.module';

import { BaseMenuDemoModule } from './menu/menu/menudemo.module';
import { BaseContextMenuDemoModule } from './menu/contextmenu/contextmenudemo.module';
import { BasePanelMenuDemoModule } from './menu/panelmenu/panelmenudemo.module';
import { BaseStepsDemoModule } from './menu/steps/stepsdemo.module';
import { BaseTieredMenuDemoModule } from './menu/tieredmenu/tieredmenudemo.module';
import { BaseBreadcrumbDemoModule } from './menu/breadcrumb/breadcrumbdemo.module';
import { BaseMegaMenuDemoModule } from './menu/megamenu/megamenudemo.module';
import { BaseMenuBarDemoModule } from './menu/menubar/menubardemo.module';
import { BaseSlideMenuDemoModule } from './menu/slidemenu/slidemenudemo.module';
import { BaseTabMenuDemoModule } from './menu/tabmenu/tabmenudemo.module';

import { BaseBlockUIDemoModule } from './misc/blockui/blockuidemo.module';
import { BaseCaptchaDemoModule } from './misc/captcha/captchademo.module';
import { BaseDeferDemoModule } from './misc/defer/deferdemo.module';
import { BaseInplaceDemoModule } from './misc/inplace/inplacedemo.module';
import { BaseProgressBarDemoModule } from './misc/progressbar/progressbardemo.module';
import { BaseRTLDemoModule } from './misc/rtl/rtldemo.module';
import { BaseTerminalDemoModule } from './misc/terminal/terminaldemo.module';
import { BaseValidationDemoModule } from './misc/validation/validationdemo.module';
import { BaseProgressSpinnerDemoModule } from './misc/progressspinner/progressspinnerdemo.module';

@NgModule({
    imports: [
        BaseMenuDemoModule,
        BaseContextMenuDemoModule,
        BasePanelMenuDemoModule,
        BaseStepsDemoModule,
        BaseTieredMenuDemoModule,
        BaseBreadcrumbDemoModule,
        BaseMegaMenuDemoModule,
        BaseMenuBarDemoModule,
        BaseSlideMenuDemoModule,
        BaseTabMenuDemoModule,

        BaseBlockUIDemoModule,
        BaseCaptchaDemoModule,
        BaseDeferDemoModule,
        BaseInplaceDemoModule,
        BaseProgressBarDemoModule,
        BaseInputMaskDemoModule,
        BaseRTLDemoModule,
        BaseTerminalDemoModule,
        BaseValidationDemoModule,

        BaseButtonDemoModule,
        BaseSplitbuttonDemoModule,

        BaseInputTextDemoModule,
        BaseInputTextAreaDemoModule,
        BaseInputGroupDemoModule,
        BaseCalendarDemoModule,
        BaseChipsDemoModule,
        BaseInputMaskDemoModule,
        BaseInputSwitchDemoModule,
        BasePasswordIndicatorDemoModule,
        BaseAutoCompleteDemoModule,
        BaseSliderDemoModule,
        BaseSpinnerDemoModule,
        BaseRatingDemoModule,
        BaseSelectDemoModule,
        BaseSelectButtonDemoModule,
        BaseListboxDemoModule,
        BaseRadioButtonDemoModule,
        BaseToggleButtonDemoModule,
        BaseEditorDemoModule,
        BaseColorPickerDemoModule,
        BaseCheckboxDemoModule,
        BaseKeyFilterDemoModule,

        BaseGrowlDemoModule,
        BaseMessagesDemoModule,
        /*BaseToastDemoModule,*/
        BaseGalleriaDemoModule,

        BaseFileUploadDemoModule,

        BaseAccordionDemoModule,
        BasePanelDemoModule,
        BaseTabViewDemoModule,
        BaseFieldsetDemoModule,
        BaseToolbarDemoModule,
        BaseGridDemoModule,
        BaseScrollPanelDemoModule,
        BaseCardDemoModule,

        BaseBarchartDemoModule,
        BaseDoughnutchartDemoModule,
        BaseLinechartDemoModule,
        BasePiechartDemoModule,
        BasePolarareachartDemoModule,
        BaseRadarchartDemoModule,

        BaseDragDropDemoModule,

        BaseDialogDemoModule,
        BaseConfirmDialogDemoModule,
        BaseLightboxDemoModule,
        BaseTooltipDemoModule,
        BaseOverlayPanelDemoModule,
        BaseSideBarDemoModule,

        BaseDataTableDemoModule,
        BaseTableDemoModule,
        BaseDataGridDemoModule,
        BaseDataListDemoModule,
        BaseDataViewDemoModule,
        BaseDataScrollerDemoModule,
        BaseScheduleDemoModule,
        BaseOrderListDemoModule,
        BasePickListDemoModule,
        BaseTreeDemoModule,
        BaseTreeTableDemoModule,
        BasePaginatorDemoModule,
        BaseOrgChartDemoModule,
        BaseGmapDemoModule,
        BaseCarouselDemoModule,
        BaseProgressSpinnerDemoModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseprimengModule {}
