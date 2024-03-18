import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from 'src/app/services/vendor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userDetail: any;
  constructor(
    public authService: AuthService,
    private vendorService: VendorService,
    private router: Router,
  ) { }
  navbarItems: any[] = [];
  role = localStorage.getItem('userRole');
  routerMapper: any = {
    'Wedding Venues': 'wedding-venues',
    "Wedding Vendors": 'weddingvendors',
    "Brides": 'brides',
    "Grooms": 'grooms',
  }

  sectorId: any;
  categoryId: any;



  // ... Other code ...

  // Method to navigate and close the sidebar
  // Inside your component class





  getSectors() {
    this.vendorService.getSectors().subscribe((response: any) => {

      const storedSectorsJSON = localStorage.getItem("AllSectorAndCategory");
      if (storedSectorsJSON) {
        const storedSectors = JSON.parse(storedSectorsJSON);
        if (JSON.stringify(response.sector) !== JSON.stringify(storedSectors)) {
          localStorage.setItem('AllSectorAndCategory', JSON.stringify(response.sector));
        }
      } else {
        localStorage.setItem('AllSectorAndCategory', JSON.stringify(response.sector));
      }

      if (response.success) {
        // Assuming the API response structure matches the expected structure
        this.navbarItems = response.sector.map((sector: any) => {
          return {
            parentTitle: sector.name,
            queryParams: sector._id,
            children: sector.categorys.map((category: any) => {
              return {
                title: category.name,
                queryParams: category._id // Modify the link as needed
              };
            }).sort((a: { title: string; }, b: { title: any; }) => a.title.localeCompare(b.title)), // Sort the children alphabetically
          };
        });
      }
    });
  }

  navigateToEachCategoryStore(sectorName: string = '', categoryName: string = '') {
    // console.log(sector  + ' - '+ category );
    const closeButton = document.querySelector('.btn-close') as HTMLElement;
    if (closeButton) {
      closeButton.click();
    }
    // console.log({ sector: param, category: categoryParam, title: title.replace(" ", "-").toLowerCase() })
    // sessionStorage.setItem('path', JSON.stringify({ sector: param, category: categoryParam }));


    const allSectorAndCategory = JSON.parse(localStorage.getItem('AllSectorAndCategory') || '[]');
    const sector = allSectorAndCategory.find((sector: any) => sector.name === sectorName);
    if (sector) {
      this.sectorId = sector._id;
      // console.log('Sector ID:', sector._id);
    } else {
      console.error('Sector not found!');
    }

    // Find category by name

    if (sector) {
      const category = sector.categorys.find((category: any) => category.name === categoryName);
      if (category) {
        this.categoryId = category._id;
        // console.log('Category ID:', category._id);
      } else {
        console.error('Category not found in the sector!');
      }
    }
    console.log(this.sectorId, this.categoryId);
    const navigationExtras: NavigationExtras = {
      state: {
        sectorId: this.sectorId,
        categoryId: this.categoryId
      }
    };

    this.router.navigate([`/${sectorName.replace(/ /g, "-").toLowerCase()}/${categoryName.replace(/ /g, "-").toLowerCase()}`], navigationExtras);

  }

  ngOnInit() {
    // Call your API service to fetch data
    this.getSectors();
  }

  open = false;

  close() {
    this.open = false;
  }

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (window.innerWidth > 793) {
      this.navbarOpen = false;
    }
  }
}
