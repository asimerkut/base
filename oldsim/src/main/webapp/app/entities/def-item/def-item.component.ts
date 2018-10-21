import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DefItem} from './def-item.model';
import {DefItemService} from './def-item.service';
import {Principal} from '../../shared';
import {ComboSelModel} from '../common/combo-sel-model';
import {DefType, DefTypeService} from '../def-type';
import {MenuItem, Message, TreeNode} from 'primeng/components/common/api';

@Component({
    selector: 'jhi-def-item',
    templateUrl: './def-item.component.html',
    styles: []
})
export class DefItemComponent implements OnInit, OnDestroy {

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

    constructor(private defItemService: DefItemService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                // private activatedRoute: ActivatedRoute,
                private principal: Principal,
                private defTypeService: DefTypeService) {
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
        console.log(this.comboSelModel.comboSel);
        const comboSelId = this.comboSelModel.comboSel == null ? 0 : this.comboSelModel.comboSel.id;
        const searchFilter = {
            selId: comboSelId
        };
        this.currentSearch = JSON.stringify(searchFilter);

        // this.defItemService.search({
        //        query: this.currentSearch,
        //        }).subscribe(
        //            (res: HttpResponse<DefItem[]>) => this.defItems = res.body,
        //            (res: HttpErrorResponse) => this.onError(res.message)
        //        );

        this.defItemService.getTreeData(this.currentSearch).subscribe(
            (places: any) => this.singleSelectionTreeTable = places
        );
        return;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.defTypeService.query()
            .subscribe((res: HttpResponse<DefType[]>) => {
                this.comboSelModel.comboList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.comboSelModel.comboSel = null;

        this.defItemService.getTreeData(this.currentSearch).subscribe(
            (places: any) => this.singleSelectionTreeTable = places
        );

        this.loadAll();
        this.registerChangeInDefItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DefItem) {
        return item.id;
    }

    registerChangeInDefItems() {
        this.eventSubscriber = this.eventManager.subscribe('defItemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onChangeComboSel($event) {
        this.selectedTreePlace = null;
        this.search();
    }

    trackComboSel(index, item: any) {
        return (item == null) ? 0 : item.id;
    }

    nodeSelect(event: any) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.data.name});
    }

    nodeUnselect(event: any) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.data.name});
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
            this.defItemService.getTreeData(this.currentSearch).subscribe((nodes: any) => event.node.children = nodes.data);
        }
    }

    viewNode(node: TreeNode) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: node.data.name});
    }

    deleteNode(node: TreeNode) {
        node.parent.children = node.parent.children.filter((n) => n.data !== node.data);
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Deleted', detail: node.data.name});
    }

    onChangeStep(label: string) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: label});
    }
}
