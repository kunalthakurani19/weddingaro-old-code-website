import { VendorService } from 'src/app/services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/components/common-components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor-table',
  templateUrl: './vendor-table.component.html',
  styleUrls: ['./vendor-table.component.scss']
})
export class VendorTableComponent implements OnInit {
  constructor(private vendorService: VendorService, private dialog: MatDialog, private toastrService: ToastrService) { }
  ngOnInit(): void {
    // localStorage.removeItem('storeId')
    this.getStore()
  }
  store: any = [];
  filteredStore: any = [];
  searchQuery: string = '';

  displayedColumns: string[] = ['name', 'mobile', 'email', 'location', 'action'];

  getStore() {
    this.vendorService.getStore().subscribe((res: any) => {
      this.store = res.stores.map((item: any) => {
        return {
          name: item.store.businessdetails?.businessName,
          email: item.store.businessdetails?.email,
          mobile: item.store.businessdetails?.mobile,
          location: item.store?.location?.formatted_address,
          id: item?.store._id,
          storeToken: item.storeToken,
          storeId: item.store?._id
        }
      });
      // Initially, set filteredStore to store
      this.filteredStore = [...this.store];
    });
  }

  deleteStore(storeId: string) {
    console.log(storeId)
    this.vendorService.deleteStore(storeId).subscribe((res: any) => {
      this.toastrService.success(res.message);
      this.getStore();
    });
  }

  confirmDelete(storeId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the user clicks "Yes" in the confirmation dialog
        this.deleteStore(storeId);
      }
    });
  }

  applyFilter() {
    // If search query is empty, display all stores
    if (!this.searchQuery.trim()) {
      this.filteredStore = [...this.store];
      return;
    }

    // Filter stores based on search query
    this.filteredStore = this.store.filter((item: any) =>
      item.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
    );
  }

  removeStoreid() {
    localStorage.removeItem("storeId");
    localStorage.removeItem("storetoken");
  }

}
