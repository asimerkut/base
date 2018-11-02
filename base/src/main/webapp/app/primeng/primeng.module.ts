import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PerButtonDemoModule } from './buttons/button/buttondemo.module';
import { PerSplitbuttonDemoModule } from './buttons/splitbutton/splitbuttondemo.module';

import { PerDialogDemoModule } from './overlay/dialog/dialogdemo.module';
import { PerConfirmDialogDemoModule } from './overlay/confirmdialog/confirmdialogdemo.module';
import { PerLightboxDemoModule } from './overlay/lightbox/lightboxdemo.module';
import { PerTooltipDemoModule } from './overlay/tooltip/tooltipdemo.module';
import { PerOverlayPanelDemoModule } from './overlay/overlaypanel/overlaypaneldemo.module';
import { PerSideBarDemoModule } from './overlay/sidebar/sidebardemo.module';

import { PerKeyFilterDemoModule } from './inputs/keyfilter/keyfilterdemo.module';
import { PerInputTextDemoModule } from './inputs/inputtext/inputtextdemo.module';
import { PerInputTextAreaDemoModule } from './inputs/inputtextarea/inputtextareademo.module';
import { PerInputGroupDemoModule } from './inputs/inputgroup/inputgroupdemo.module';
import { PerCalendarDemoModule } from './inputs/calendar/calendardemo.module';
import { PerCheckboxDemoModule } from './inputs/checkbox/checkboxdemo.module';
import { PerChipsDemoModule } from './inputs/chips/chipsdemo.module';
import { PerColorPickerDemoModule } from './inputs/colorpicker/colorpickerdemo.module';
import { PerInputMaskDemoModule } from './inputs/inputmask/inputmaskdemo.module';
import { PerInputSwitchDemoModule } from './inputs/inputswitch/inputswitchdemo.module';
import { PerPasswordIndicatorDemoModule } from './inputs/passwordindicator/passwordindicatordemo.module';
import { PerAutoCompleteDemoModule } from './inputs/autocomplete/autocompletedemo.module';
import { PerSliderDemoModule } from './inputs/slider/sliderdemo.module';
import { PerSpinnerDemoModule } from './inputs/spinner/spinnerdemo.module';
import { PerRatingDemoModule } from './inputs/rating/ratingdemo.module';
import { PerSelectDemoModule } from './inputs/select/selectdemo.module';
import { PerSelectButtonDemoModule } from './inputs/selectbutton/selectbuttondemo.module';
import { PerListboxDemoModule } from './inputs/listbox/listboxdemo.module';
import { PerRadioButtonDemoModule } from './inputs/radiobutton/radiobuttondemo.module';
import { PerToggleButtonDemoModule } from './inputs/togglebutton/togglebuttondemo.module';
import { PerEditorDemoModule } from './inputs/editor/editordemo.module';

import { PerGrowlDemoModule } from './messages/growl/growldemo.module';
import { PerMessagesDemoModule } from './messages/messages/messagesdemo.module';
/*import { PerToastDemoModule } from './messages/toast/toastdemo.module';*/
import { PerGalleriaDemoModule } from './multimedia/galleria/galleriademo.module';

import { PerFileUploadDemoModule } from './fileupload/fileupload/fileuploaddemo.module';

import { PerAccordionDemoModule } from './panel/accordion/accordiondemo.module';
import { PerPanelDemoModule } from './panel/panel/paneldemo.module';
import { PerTabViewDemoModule } from './panel/tabview/tabviewdemo.module';
import { PerFieldsetDemoModule } from './panel/fieldset/fieldsetdemo.module';
import { PerToolbarDemoModule } from './panel/toolbar/toolbardemo.module';
import { PerGridDemoModule } from './panel/grid/griddemo.module';
import { PerScrollPanelDemoModule } from './panel/scrollpanel/scrollpaneldemo.module';
import { PerCardDemoModule } from './panel/card/carddemo.module';

import { PerDataTableDemoModule } from './data/datatable/datatabledemo.module';
import { PerTableDemoModule } from './data/table/tabledemo.module';
import { PerDataGridDemoModule } from './data/datagrid/datagriddemo.module';
import { PerDataListDemoModule } from './data/datalist/datalistdemo.module';
import { PerDataScrollerDemoModule } from './data/datascroller/datascrollerdemo.module';
import { PerPickListDemoModule } from './data/picklist/picklistdemo.module';
import { PerOrderListDemoModule } from './data/orderlist/orderlistdemo.module';
import { PerScheduleDemoModule } from './data/schedule/scheduledemo.module';
import { PerTreeDemoModule } from './data/tree/treedemo.module';
import { PerTreeTableDemoModule } from './data/treetable/treetabledemo.module';
import { PerPaginatorDemoModule } from './data/paginator/paginatordemo.module';
import { PerGmapDemoModule } from './data/gmap/gmapdemo.module';
import { PerOrgChartDemoModule } from './data/orgchart/orgchartdemo.module';
import { PerCarouselDemoModule } from './data/carousel/carouseldemo.module';
import { PerDataViewDemoModule } from './data/dataview/dataviewdemo.module';

import { PerBarchartDemoModule } from './charts/barchart/barchartdemo.module';
import { PerDoughnutchartDemoModule } from './charts/doughnutchart/doughnutchartdemo.module';
import { PerLinechartDemoModule } from './charts/linechart/linechartdemo.module';
import { PerPiechartDemoModule } from './charts/piechart/piechartdemo.module';
import { PerPolarareachartDemoModule } from './charts/polarareachart/polarareachartdemo.module';
import { PerRadarchartDemoModule } from './charts/radarchart/radarchartdemo.module';

import { PerDragDropDemoModule } from './dragdrop/dragdrop/dragdropdemo.module';

import { PerMenuDemoModule } from './menu/menu/menudemo.module';
import { PerContextMenuDemoModule } from './menu/contextmenu/contextmenudemo.module';
import { PerPanelMenuDemoModule } from './menu/panelmenu/panelmenudemo.module';
import { PerStepsDemoModule } from './menu/steps/stepsdemo.module';
import { PerTieredMenuDemoModule } from './menu/tieredmenu/tieredmenudemo.module';
import { PerBreadcrumbDemoModule } from './menu/breadcrumb/breadcrumbdemo.module';
import { PerMegaMenuDemoModule } from './menu/megamenu/megamenudemo.module';
import { PerMenuBarDemoModule } from './menu/menubar/menubardemo.module';
import { PerSlideMenuDemoModule } from './menu/slidemenu/slidemenudemo.module';
import { PerTabMenuDemoModule } from './menu/tabmenu/tabmenudemo.module';

import { PerBlockUIDemoModule } from './misc/blockui/blockuidemo.module';
import { PerCaptchaDemoModule } from './misc/captcha/captchademo.module';
import { PerDeferDemoModule } from './misc/defer/deferdemo.module';
import { PerInplaceDemoModule } from './misc/inplace/inplacedemo.module';
import { PerProgressBarDemoModule } from './misc/progressbar/progressbardemo.module';
import { PerRTLDemoModule } from './misc/rtl/rtldemo.module';
import { PerTerminalDemoModule } from './misc/terminal/terminaldemo.module';
import { PerValidationDemoModule } from './misc/validation/validationdemo.module';
import { PerProgressSpinnerDemoModule } from './misc/progressspinner/progressspinnerdemo.module';

@NgModule({
    imports: [
        PerMenuDemoModule,
        PerContextMenuDemoModule,
        PerPanelMenuDemoModule,
        PerStepsDemoModule,
        PerTieredMenuDemoModule,
        PerBreadcrumbDemoModule,
        PerMegaMenuDemoModule,
        PerMenuBarDemoModule,
        PerSlideMenuDemoModule,
        PerTabMenuDemoModule,

        PerBlockUIDemoModule,
        PerCaptchaDemoModule,
        PerDeferDemoModule,
        PerInplaceDemoModule,
        PerProgressBarDemoModule,
        PerInputMaskDemoModule,
        PerRTLDemoModule,
        PerTerminalDemoModule,
        PerValidationDemoModule,

        PerButtonDemoModule,
        PerSplitbuttonDemoModule,

        PerInputTextDemoModule,
        PerInputTextAreaDemoModule,
        PerInputGroupDemoModule,
        PerCalendarDemoModule,
        PerChipsDemoModule,
        PerInputMaskDemoModule,
        PerInputSwitchDemoModule,
        PerPasswordIndicatorDemoModule,
        PerAutoCompleteDemoModule,
        PerSliderDemoModule,
        PerSpinnerDemoModule,
        PerRatingDemoModule,
        PerSelectDemoModule,
        PerSelectButtonDemoModule,
        PerListboxDemoModule,
        PerRadioButtonDemoModule,
        PerToggleButtonDemoModule,
        PerEditorDemoModule,
        PerColorPickerDemoModule,
        PerCheckboxDemoModule,
        PerKeyFilterDemoModule,

        PerGrowlDemoModule,
        PerMessagesDemoModule,
        /*PerToastDemoModule,*/
        PerGalleriaDemoModule,

        PerFileUploadDemoModule,

        PerAccordionDemoModule,
        PerPanelDemoModule,
        PerTabViewDemoModule,
        PerFieldsetDemoModule,
        PerToolbarDemoModule,
        PerGridDemoModule,
        PerScrollPanelDemoModule,
        PerCardDemoModule,

        PerBarchartDemoModule,
        PerDoughnutchartDemoModule,
        PerLinechartDemoModule,
        PerPiechartDemoModule,
        PerPolarareachartDemoModule,
        PerRadarchartDemoModule,

        PerDragDropDemoModule,

        PerDialogDemoModule,
        PerConfirmDialogDemoModule,
        PerLightboxDemoModule,
        PerTooltipDemoModule,
        PerOverlayPanelDemoModule,
        PerSideBarDemoModule,

        PerDataTableDemoModule,
        PerTableDemoModule,
        PerDataGridDemoModule,
        PerDataListDemoModule,
        PerDataViewDemoModule,
        PerDataScrollerDemoModule,
        PerScheduleDemoModule,
        PerOrderListDemoModule,
        PerPickListDemoModule,
        PerTreeDemoModule,
        PerTreeTableDemoModule,
        PerPaginatorDemoModule,
        PerOrgChartDemoModule,
        PerGmapDemoModule,
        PerCarouselDemoModule,
        PerProgressSpinnerDemoModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PerprimengModule {}
