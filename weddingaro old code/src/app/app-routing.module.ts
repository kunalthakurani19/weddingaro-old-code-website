import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/pages/homepage/homepage.component";
import { SignupComponent } from "./components/pages/signup/signup.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { ForgotPasswordComponent } from "./components/pages/forgot-password/forgot-password.component";
import { WeddingVenuePageComponent } from "./components/pages/wedding-venue-page/wedding-venue-page.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { VenueDetailsPageComponent } from "./components/pages/venue-details-page/venue-details-page.component";
import { HomeComponent } from "./components/pages/dashboard/home/home.component";
import { StorefrontComponent } from "./components/pages/dashboard/storefront/storefront.component";
import { BusinessDetailsComponent } from "./components/pages/dashboard/storefront/business-details/business-details.component";
import { VendorTableComponent } from "./components/pages/dashboard/storefront/vendor-table/vendor-table.component";
import { LocationComponent } from "./components/pages/dashboard/storefront/location/location.component";
import { PhotosComponent } from "./components/pages/dashboard/storefront/photos/photos.component";
import { VideosComponent } from "./components/pages/dashboard/storefront/videos/videos.component";
import { AvailabilityComponent } from "./components/pages/dashboard/storefront/availability/availability.component";
import { FaqsComponent } from "./components/pages/dashboard/storefront/faqs/faqs.component";
import { SocialNetworksComponent } from "./components/pages/dashboard/storefront/social-networks/social-networks.component";
import { EnquiriesComponent } from "./components/pages/dashboard/enquiries/enquiries.component";
import { InboxContentComponent } from "./components/pages/dashboard/enquiries/inbox-content/inbox-content.component";
import { TemplateContentComponent } from "./components/pages/dashboard/enquiries/template-content/template-content.component";
import { RepliedContentComponent } from "./components/pages/dashboard/enquiries/replied-content/replied-content.component";
import { SettingContentComponent } from "./components/pages/dashboard/enquiries/setting-content/setting-content.component";
import { EventsComponent } from "./components/pages/dashboard/storefront/events/events.component";
import { MenusComponent } from "./components/pages/dashboard/storefront/menus/menus.component";
import { ReviewComponent } from "./components/pages/dashboard/review/review.component";
import { ReviewCollectorComponent } from "./components/pages/dashboard/review/review-collector/review-collector.component";
import { ReviewContentComponent } from "./components/pages/dashboard/review/review-content/review-content.component";
import { SettingComponent } from "./components/pages/dashboard/setting/setting.component";
import { BillingComponent } from "./components/pages/dashboard/billing/billing.component";
import { BillsComponent } from "./components/pages/dashboard/billing/bills/bills.component";
import { InvoicesComponent } from "./components/pages/dashboard/billing/invoices/invoices.component";
import { VendorauthguardService } from "./services/vendorauthguard.service";
import { AuthguardService } from "./services/authguard.service";
import { UserdashboardComponent } from "./components/pages/userdashboard/userdashboard.component";
import { MyweddingComponent } from "./components/pages/userdashboard/mywedding/mywedding.component";
import { ChecklistComponent } from "./components/pages/userdashboard/checklist/checklist.component";
import { WeddingvendorsComponent } from "./components/pages/weddingvendors/weddingvendors.component";
import { GuestsComponent } from "./components/pages/userdashboard/guests/guests.component";
import { BudgetComponent } from "./components/pages/userdashboard/budget/budget.component";
import { InnerchecklistComponent } from "./components/pages/userdashboard/checklist/innerchecklist/innerchecklist.component";
import { BudgetscreenComponent } from "./components/pages/userdashboard/budget/budgetscreen/budgetscreen.component";
import { CategorybudgetsideComponent } from "./components/pages/userdashboard/budget/categorybudgetside/categorybudgetside.component";
import { AllvendorshowComponent } from "./components/pages/weddingvendors/allvendorshow/allvendorshow.component";
import { VendormanagerComponent } from "./components/pages/weddingvendors/vendormanager/vendormanager.component";
import { VendorelementsComponent } from "./components/pages/weddingvendors/allvendorshow/vendorelements/vendorelements.component";
import { MyweddingContentComponent } from "./components/pages/userdashboard/mywedding/mywedding-content/mywedding-content.component";
import { UsermessagesComponent } from "./components/pages/userdashboard/mywedding/usermessages/usermessages.component";
import { UserinboxComponent } from "./components/pages/userdashboard/mywedding/userinbox/userinbox.component";
import { FavroitevendorComponent } from "./components/pages/favroitevendor/favroitevendor.component";
import { TermsandconditionComponent } from "./components/pages/termsandcondition/termsandcondition.component";
import { AboutusComponent } from "./components/pages/aboutus/aboutus.component";
import { ContactUsComponent } from "./components/pages/contact-us/contact-us.component";
import { CareersComponent } from "./components/pages/careers/careers.component";
import { BridesComponent } from "./components/pages/brides/brides.component";
import { GroomsComponent } from "./components/pages/grooms/grooms.component";
import { WeedingvendorsnavComponent } from "./components/pages/weedingvendorsnav/weedingvendorsnav.component";
import { CommingsoonComponent } from "./components/pages/commingsoon/commingsoon.component";
import { UserguardService } from "./services/userguard.service";
import { StorefrontStatusComponent } from "./components/pages/storefront-status/storefront-status.component";
import { ExperimentcomponentComponent } from "./experimentcomponent/experimentcomponent.component";
import { ReviewstepsComponent } from "./components/reviewsteps/reviewsteps.component";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { AdminDashboardComponent } from "./components/admin-panel/admin-dashboard/admin-dashboard.component";
import { AdminUserComponent } from "./components/admin-panel/admin-user/admin-user.component";
import { AdminSettingComponent } from "./components/admin-panel/admin-setting/admin-setting.component";
import { AdminStoreComponent } from "./components/admin-panel/admin-store/admin-store.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "home", component: HomepageComponent },
  { path: "signup", component: SignupComponent },
  { path: "experiment", component: ExperimentcomponentComponent },
  {
    path: "signup/:role",
    component: SignupComponent,
    canActivate: [AuthguardService],
  },
  {
    path: "login/:role",
    component: LoginComponent,
    canActivate: [AuthguardService],
  },
  { path: "activate-account/:token", component: HomepageComponent },
  { path: "activate-account/:token", component: HomepageComponent },
  { path: "change-password/:token", component: ForgotPasswordComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [VendorauthguardService],
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "storefront",
        component: StorefrontComponent,
        children: [
          { path: "", component: VendorTableComponent },
          { path: "vendor-business", component: VendorTableComponent },
          { path: "business-details", component: BusinessDetailsComponent },
          { path: "business-details/:id", component: BusinessDetailsComponent },
          { path: "location", component: LocationComponent },
          { path: "photos", component: PhotosComponent },
          { path: "videos", component: VideosComponent },
          { path: "availability", component: AvailabilityComponent },
          { path: "faqs", component: FaqsComponent },
          { path: "social-networks", component: SocialNetworksComponent },
          { path: "events", component: EventsComponent },
          { path: "menus", component: MenusComponent },
          { path: "storefrontStatus", component: StorefrontStatusComponent },
        ],
      },
      {
        path: "enquiries",
        component: EnquiriesComponent,
        children: [
          { path: "", component: InboxContentComponent },
          { path: "inbox", component: InboxContentComponent },
          { path: "replied", component: RepliedContentComponent },
          { path: "setting", component: SettingContentComponent },
          { path: "template", component: TemplateContentComponent },
        ],
      },
      {
        path: "review",
        component: ReviewComponent,
        children: [
          // { path: "", component: ReviewCollectorComponent },
          { path: "", component: ReviewContentComponent },
          // { path: "review-collector", component: ReviewCollectorComponent },
          { path: "reviews", component: ReviewContentComponent },
        ],
      },
      {
        path: "setting",
        component: SettingComponent,
      },
      {
        path: "billing",
        component: BillingComponent,
        children: [
          { path: "", component: BillsComponent },
          { path: "bills", component: BillsComponent },
          { path: "invoices", component: InvoicesComponent },
        ],
      },
    ],
  },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "wedding-venues", component: WeddingVenuePageComponent },
  {
    path: "wedding-venues/:id",
    component: WeddingVenuePageComponent,
  },
  { path: ":category-name", component: WeddingVenuePageComponent, },
  {
    path: "brides",
    component: BridesComponent,
  },
  {
    path: "brides/:id",
    component: BridesComponent,
  },

  {
    path: "grooms",
    component: GroomsComponent,

  },
  {
    path: "grooms/:id",
    component: GroomsComponent,

  },
  {
    path: "wedding-vendors",
    component: WeedingvendorsnavComponent,
  },
  {
    path: "wedding-vendors/:id",
    component: WeedingvendorsnavComponent,
  },
  { path: 'venues-details/:id', component: VenueDetailsPageComponent },
  {
    path: "user-dashboard",
    component: UserdashboardComponent,
    canActivate: [UserguardService],
    children: [
      { path: "", component: MyweddingContentComponent },
      {
        path: "my-wedding",
        component: MyweddingComponent,
        children: [
          { path: "", component: MyweddingContentComponent },
          { path: "user-messages", component: UsermessagesComponent },
          { path: "user-inbox", component: UserinboxComponent },
        ],
      },

      {
        path: "checklist",
        component: ChecklistComponent,
        children: [{ path: "", component: InnerchecklistComponent }],
      },

      {
        path: "wedding-vendors",
        component: WeddingvendorsComponent,
        children: [
          { path: "", component: VendormanagerComponent },
          {
            path: "allvendorshow/:venueId",
            component: AllvendorshowComponent,
            children: [{ path: "", component: VendorelementsComponent }],
          },
        ],
      },
      { path: "guests", component: GuestsComponent },
      {
        path: "budget",
        component: BudgetComponent,
        children: [
          { path: "", component: BudgetscreenComponent },
          { path: "budgetcategory", component: CategorybudgetsideComponent },
        ],
      },
    ],
  },
  { path: "fav-vendor", component: FavroitevendorComponent },
  { path: "terms-and-condition", component: TermsandconditionComponent },
  { path: "about-us", component: AboutusComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "career", component: CareersComponent },
  { path: "comming-soon", component: CommingsoonComponent },
  { path: "write-review/:id", component: ReviewstepsComponent },


  {
    path: "adminpanel", component: AdminPanelComponent,
    children: [
      {
        path: "",
        component: AdminDashboardComponent,
      },
      {
        path: "dashboard",
        component: AdminDashboardComponent,
      },
      {
        path: "user",
        component: AdminUserComponent,
      },
      {
        path: "setting",
        component: AdminSettingComponent,
      },
      {
        path: "store",
        component: AdminStoreComponent,
      },

    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
