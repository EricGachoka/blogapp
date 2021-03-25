import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tag',
        data: { pageTitle: 'gatewayApp.blogTag.home.title' },
        loadChildren: () => import('./blog/tag/tag.module').then(m => m.BlogTagModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'gatewayApp.storeProduct.home.title' },
        loadChildren: () => import('./store/product/product.module').then(m => m.StoreProductModule),
      },
      {
        path: 'blog',
        data: { pageTitle: 'gatewayApp.blogBlog.home.title' },
        loadChildren: () => import('./blog/blog/blog.module').then(m => m.BlogBlogModule),
      },
      {
        path: 'post',
        data: { pageTitle: 'gatewayApp.blogPost.home.title' },
        loadChildren: () => import('./blog/post/post.module').then(m => m.BlogPostModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
