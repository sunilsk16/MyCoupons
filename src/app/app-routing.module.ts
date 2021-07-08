import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'coupons',
    loadChildren: () => import('./pages/coupons/coupons.module').then( m => m.CouponsPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'refer',
    loadChildren: () => import('./pages/refer/refer.module').then( m => m.ReferPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'rewards',
    loadChildren: () => import('./pages/rewards/rewards.module').then( m => m.RewardsPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'deals',
    loadChildren: () => import('./pages/deals/deals.module').then( m => m.DealsPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then( m => m.PaymentsPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then( m => m.TermsPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'admincoupons',
    loadChildren: () => import('./adminpages/admincoupons/admincoupons.module').then( m => m.AdmincouponsPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'create-role',
    loadChildren: () => import('./adminpages/role-management/create-role/create-role.module').then( m => m.CreateRolePageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'role-list',
    loadChildren: () => import('./adminpages/role-management/role-list/role-list.module').then( m => m.RoleListPageModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'admin-deals',
    loadChildren: () => import('./adminpages/admin-deals/admin-deals.module').then( m => m.AdminDealsPageModule)
  },
  {
    path: 'admin-rewards',
    loadChildren: () => import('./adminpages/admin-rewards/admin-rewards.module').then( m => m.AdminRewardsPageModule)
  },
  {
    path: 'member-list',
    loadChildren: () => import('./adminpages/member-list/member-list.module').then( m => m.MemberListPageModule)
  },
  {
    path: 'add-member',
    loadChildren: () => import('./adminpages/add-member/add-member.module').then( m => m.AddMemberPageModule)
  },
  {
    path: 'a/dashboard',
    loadChildren: () => import('./adminpages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'coupons-list',
    loadChildren: () => import('./adminpages/coupons-list/coupons-list.module').then( m => m.CouponsListPageModule)
  },
  {
    path: 'rewards-list',
    loadChildren: () => import('./adminpages/rewards-list/rewards-list.module').then( m => m.RewardsListPageModule)
  },
  {
    path: 'deals-list',
    loadChildren: () => import('./adminpages/deals-list/deals-list.module').then( m => m.DealsListPageModule)
  },
  {
    path: 'create-faq',
    loadChildren: () => import('./adminpages/create-faq/create-faq.module').then( m => m.CreateFaqPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
