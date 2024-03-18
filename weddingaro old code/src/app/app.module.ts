import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { CustomCardComponent } from './components/layout/custom-card/custom-card.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/pages/login/login.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { WeddingVenuePageComponent } from './components/pages/wedding-venue-page/wedding-venue-page.component';
import { CustomSliderComponent } from './components/custom-slider/custom-slider.component';
import { CityVenuesComponent } from './components/city-venues/city-venues.component';
import { CustomCollapseComponent } from './components/custom-collapse/custom-collapse.component';
import { VenueCardComponent } from './components/venue-card/venue-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeddingCardComponent } from './components/wedding-card/wedding-card.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppInterceptor } from './interceptors/app-interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';



import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { VenueDetailsPageComponent } from './components/pages/venue-details-page/venue-details-page.component';
import { HomeComponent } from './components/pages/dashboard/home/home.component';
import { StorefrontComponent } from './components/pages/dashboard/storefront/storefront.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BusinessDetailsComponent } from './components/pages/dashboard/storefront/business-details/business-details.component';
import { VendorTableComponent } from './components/pages/dashboard/storefront/vendor-table/vendor-table.component';
import { LocationComponent } from './components/pages/dashboard/storefront/location/location.component';
import { PhotosComponent } from './components/pages/dashboard/storefront/photos/photos.component';
import { CommonStoreSidebarComponent } from './components/pages/dashboard/storefront/common-store-sidebar/common-store-sidebar.component';
import { PhotosDetailsDialogComponent } from './components/pages/dashboard/storefront/photos-details-dialog/photos-details-dialog.component';
import { VideosComponent } from './components/pages/dashboard/storefront/videos/videos.component';
import { AvailabilityComponent } from './components/pages/dashboard/storefront/availability/availability.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FaqsComponent } from './components/pages/dashboard/storefront/faqs/faqs.component';
import { SocialNetworksComponent } from './components/pages/dashboard/storefront/social-networks/social-networks.component';
import { EnquiriesComponent } from './components/pages/dashboard/enquiries/enquiries.component';

import { TemplateContentComponent } from './components/pages/dashboard/enquiries/template-content/template-content.component';
import { InboxContentComponent } from './components/pages/dashboard/enquiries/inbox-content/inbox-content.component';
import { SettingContentComponent } from './components/pages/dashboard/enquiries/setting-content/setting-content.component';
import { RepliedContentComponent } from './components/pages/dashboard/enquiries/replied-content/replied-content.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EventsComponent } from './components/pages/dashboard/storefront/events/events.component';
import { MenusComponent } from './components/pages/dashboard/storefront/menus/menus.component';
import { ReviewComponent } from './components/pages/dashboard/review/review.component';
import { ReviewCollectorComponent } from './components/pages/dashboard/review/review-collector/review-collector.component';
import { ReviewContentComponent } from './components/pages/dashboard/review/review-content/review-content.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SettingComponent } from './components/pages/dashboard/setting/setting.component';
import { MatMenuModule } from '@angular/material/menu';
import { BillingComponent } from './components/pages/dashboard/billing/billing.component';
import { BillsComponent } from './components/pages/dashboard/billing/bills/bills.component';
import { InvoicesComponent } from './components/pages/dashboard/billing/invoices/invoices.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VendorProfileDashboardComponent } from './components/layout/navbar/vendor-profile-dashboard/vendor-profile-dashboard.component';
import { UserProfileDashboardComponent } from './components/layout/navbar/user-profile-dashboard/user-profile-dashboard.component';
import { UserdashboardComponent } from './components/pages/userdashboard/userdashboard.component';
import { MyweddingComponent } from './components/pages/userdashboard/mywedding/mywedding.component';
import { ChecklistComponent } from './components/pages/userdashboard/checklist/checklist.component';
import { WeddingvendorsComponent } from './components/pages/weddingvendors/weddingvendors.component';
import { GuestsComponent } from './components/pages/userdashboard/guests/guests.component';
import { BudgetComponent } from './components/pages/userdashboard/budget/budget.component';
import { InnerchecklistComponent } from './components/pages/userdashboard/checklist/innerchecklist/innerchecklist.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BudgetscreenComponent } from './components/pages/userdashboard/budget/budgetscreen/budgetscreen.component';
import { CategorybudgetsideComponent } from './components/pages/userdashboard/budget/categorybudgetside/categorybudgetside.component';
import { AllvendorshowComponent } from './components/pages/weddingvendors/allvendorshow/allvendorshow.component';
import { VendormanagerComponent } from './components/pages/weddingvendors/vendormanager/vendormanager.component';
import { VendorelementsComponent } from './components/pages/weddingvendors/allvendorshow/vendorelements/vendorelements.component';
import { MyweddingContentComponent } from './components/pages/userdashboard/mywedding/mywedding-content/mywedding-content.component';
import { UsermessagesComponent } from './components/pages/userdashboard/mywedding/usermessages/usermessages.component';
import { UserinboxComponent } from './components/pages/userdashboard/mywedding/userinbox/userinbox.component';
import { FavroitevendorComponent } from './components/pages/favroitevendor/favroitevendor.component';
import { MyWeddingEditModalComponent } from './components/pages/userdashboard/mywedding/my-wedding-edit-modal/my-wedding-edit-modal.component';
import { GroupsComponent } from './components/pages/userdashboard/guests/groups/groups.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { TermsandconditionComponent } from './components/pages/termsandcondition/termsandcondition.component';
import { AboutusComponent } from './components/pages/aboutus/aboutus.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { CareersComponent } from './components/pages/careers/careers.component';
import { WeddingVendorsComponent } from './components/pages/wedding-vendors/wedding-vendors.component';
import { BridesComponent } from './components/pages/brides/brides.component';
import { FiltercontentComponent } from './components/pages/filtercontent/filtercontent.component';
import { WeedingvendorsnavComponent } from './components/pages/weedingvendorsnav/weedingvendorsnav.component';
import { GroomsComponent } from './components/pages/grooms/grooms.component';
import { AdvertismentComponent } from './components/advertisment/advertisment.component';
import { TipsandFAQComponent } from './components/tipsand-faq/tipsand-faq.component';
import { CommingsoonComponent } from './components/pages/commingsoon/commingsoon.component';
import { BrideCityVenuesComponent } from './components/all-category-stores/bride-city-venues/bride-city-venues.component';
import { GroomCityVenueComponent } from './components/all-category-stores/groom-city-venue/groom-city-venue.component';
import { VendorsCityVenueComponent } from './components/all-category-stores/vendors-city-venue/vendors-city-venue.component';
import { SearchBarForHomepageComponent } from './components/search-bar-for-homepage/search-bar-for-homepage.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { ConfirmationDialogComponent } from './components/common-components/confirmation-dialog/confirmation-dialog.component';
import { ImagePreviewDialogComponent } from './components/common-components/image-preview-dialog/image-preview-dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { ScrollToTopDirective } from './scripts/scroll-to-top.directive';
import { StorefrontStatusComponent } from './components/pages/storefront-status/storefront-status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ExperimentcomponentComponent } from './experimentcomponent/experimentcomponent.component';
import { PleaseloginModalComponent } from './components/common-components/common-modals/pleaselogin-modal/pleaselogin-modal.component';
import {MatStepperModule} from '@angular/material/stepper';

import { ReviewstepsComponent } from './components/reviewsteps/reviewsteps.component';
import { StarRatingComponent } from './components/common-components/star-rating/star-rating.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminDashboardComponent } from './components/admin-panel/admin-dashboard/admin-dashboard.component';
import { AdminStoreComponent } from './components/admin-panel/admin-store/admin-store.component';
import { AdminUserComponent } from './components/admin-panel/admin-user/admin-user.component';
import { AdminSettingComponent } from './components/admin-panel/admin-setting/admin-setting.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    CustomCardComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    WeddingVenuePageComponent,
    CustomSliderComponent,
    CityVenuesComponent,
    CustomCollapseComponent,
    VenueCardComponent,
    SearchBarComponent,
    WeddingCardComponent,
    ImageCarouselComponent,
    LoaderComponent,
    DashboardComponent,
    VenueDetailsPageComponent,
    HomeComponent,
    StorefrontComponent,
    BusinessDetailsComponent,
    VendorTableComponent,
    LocationComponent,
    PhotosComponent,
    CommonStoreSidebarComponent,
    PhotosDetailsDialogComponent,
    VideosComponent,
    AvailabilityComponent,
    FaqsComponent,
    SocialNetworksComponent,
    EnquiriesComponent,
    InboxContentComponent,
    TemplateContentComponent,
    SettingContentComponent,
    RepliedContentComponent,
    ReviewComponent,
    ReviewCollectorComponent,
    ReviewContentComponent,
    PaginationComponent,
    SettingComponent,

    EventsComponent,
    MenusComponent,
    BillingComponent,
    BillsComponent,
    InvoicesComponent,
    VendorProfileDashboardComponent,
    UserProfileDashboardComponent,
    UserdashboardComponent,
    MyweddingComponent,
    ChecklistComponent,
    WeddingvendorsComponent,
    GuestsComponent,
    BudgetComponent,
    InnerchecklistComponent,
    ProgressBarComponent,
    BudgetscreenComponent,
    CategorybudgetsideComponent,
    AllvendorshowComponent,
    VendormanagerComponent,
    VendorelementsComponent,
    MyweddingContentComponent,
    UsermessagesComponent,
    UserinboxComponent,
    FavroitevendorComponent,
    MyWeddingEditModalComponent,
    GroupsComponent,
    AllProductsComponent,
    TermsandconditionComponent,
    AboutusComponent,
    ContactUsComponent,
    CareersComponent,
    WeddingVendorsComponent,
    BridesComponent,
    FiltercontentComponent,
    WeedingvendorsnavComponent,
    GroomsComponent,
    AdvertismentComponent,
    TipsandFAQComponent,
    CommingsoonComponent,
    BrideCityVenuesComponent,
    GroomCityVenueComponent,
    VendorsCityVenueComponent,
    SearchBarForHomepageComponent,
    ErrorDisplayComponent,
    ConfirmationDialogComponent,
    ImagePreviewDialogComponent,
    ScrollToTopDirective,
    StorefrontStatusComponent,
    ExperimentcomponentComponent,
    PleaseloginModalComponent,
    ReviewstepsComponent,
    StarRatingComponent,
    AdminPanelComponent,
    AdminDashboardComponent,
    AdminStoreComponent,
    AdminUserComponent,
    AdminSettingComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
    GoogleSigninButtonModule,
    CommonModule,
    MatDialogModule,
    CKEditorModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    GoogleMapsModule,
    NgCircleProgressModule.forRoot({
      radius: 40,
      space: -8,
      outerStrokeGradient: true,
      outerStrokeWidth: 8,
      innerStrokeWidth: 8,
      title: 'UI',
      showSubtitle: false,
      animateTitle: true,
      animationDuration: 1000,
      showUnits: false,
      showBackground: false,
      clockwise: true,
      startFromZero: false,
      lazy: true,
    }),
    FormsModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatChipsModule,
    NgbModule,
    CarouselModule.forRoot(),
    // SocketIoModule.forRoot(config)
    MatStepperModule,
    MatSidenavModule,
    MatSlideToggleModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '330670609667-u1gdb4r1gonebkshnevp2mb6q1tbfmj3.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
