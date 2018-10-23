import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Principal } from 'app/core';
import { MenuItem, Message, TreeNode } from 'primeng/components/common/api';
import { SessionStorageService } from 'ngx-webstorage';

import { ComboSelModel } from '../common/combo-sel-model';

import { IDefItem } from 'app/shared/model/def-item.model';
import { IDefType } from 'app/shared/model/def-type.model';

import { DefItemService } from './def-item.service';
import { DefTypeService } from '../def-type';

import { CommonService } from 'app/entities/common';
//import { TreeNodeService } from 'app/primeng/data/treetable/service/treenode.service';

@Component({
    selector: 'jhi-def-item',
    templateUrl: './def-item.component.html'
})
export class DefItemComponent implements OnInit, OnDestroy {
    //basicTreeTable: TreeNode[];

    msgs: Message[] = [];
    singleSelectionTreeTable: TreeNode[];
    selectedTreePlace: TreeNode;
    items: MenuItem[];
    activeIndex = 0;

    // defItems: DefItem[];
    comboSelModel: ComboSelModel = new ComboSelModel();
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private defItemService: DefItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private defTypeService: DefTypeService,
        private commonService: CommonService, //private nodeService: TreeNodeService
        private sessionStorage: SessionStorageService
    ) {
        // this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
        //    this.activatedRoute.snapshot.params['search'] : '';
    }

    search() {
        this.loadAll();
    }

    clear() {
        this.loadAll();
    }

    loadAll() {
        this.comboSelModel.comboSel = this.sessionStorage.retrieve('selectedComboType');
        console.log(this.comboSelModel.comboSel);
        const searchFilter = {
            selId: this.comboSelModel.comboSel == null ? 0 : this.comboSelModel.comboSel.id
        };
        this.currentSearch = JSON.stringify(searchFilter);

        // this.defItemService.search({
        //        query: this.currentSearch,
        //        }).subscribe(
        //            (res: HttpResponse<DefItem[]>) => this.defItems = res.body,
        //            (res: HttpErrorResponse) => this.onError(res.message)
        //        );

        this.commonService.getTreeData(this.currentSearch).subscribe((places: any) => (this.singleSelectionTreeTable = places));
        return;
    }

    ngOnInit() {
        //this.nodeService.getTouristPlaces().subscribe((places: any) => (this.basicTreeTable = places.data));

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.defTypeService.query().subscribe(
            (res: HttpResponse<IDefType[]>) => {
                this.comboSelModel.comboList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        //this.commonService.getTreeData(this.currentSearch).subscribe((places: any) => (this.singleSelectionTreeTable = places));
        this.loadAll();
        this.registerChangeInDefItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDefItem) {
        return item.id;
    }

    registerChangeInDefItems() {
        this.eventSubscriber = this.eventManager.subscribe('defItemListModification', response => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onChangeComboSel($event) {
        if (this.comboSelModel.comboSel != null) {
            this.sessionStorage.store('selectedComboType', this.comboSelModel.comboSel);
        }
        this.selectedTreePlace = null;
        this.search();
    }

    trackComboSel(index, item: any) {
        return item == null ? 0 : item.id;
    }

    nodeSelect(event: any) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
    }

    nodeUnselect(event: any) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Unselected', detail: event.node.data.name });
    }

    onRowDblclick(event: any) {
        this.msgs = [];
        this.msgs.push({
            severity: 'info',
            summary: 'Node Selected',
            detail: 'The TreeTable row double click is invoked'
        });
    }

    nodeExpand(event: any) {
        if (event.node) {
            this.commonService.getTreeData(this.currentSearch).subscribe((nodes: any) => (event.node.children = nodes.data));
        }
    }

    viewNode(node: TreeNode) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Selected', detail: node.data.name });
    }

    deleteNode(node: TreeNode) {
        node.parent.children = node.parent.children.filter(n => n.data !== node.data);
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Deleted', detail: node.data.name });
    }

    onChangeStep(label: string) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: label });
    }
}
