# Nuxt 3 Features Example

## Setup

Make sure to install the dependencies:

```bash
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Deploy STG

```bash
yarn deploy:staging
```
 
# Các tính năng được sử dụng:
> 1. Composition API, script setup, Typescript
> 2. Auto-import: tạo file đúng folder/tên -> nuxt 3 sẽ tự đông import
> 3. Sử dụng Pinia thay cho VueX. Một số điểm chính của Pinia so với VueX
>> - defineStore -> định nghĩa store
>> - không còn mapState, mapGetter,... thay vào đó là import trực tiếp để sử dụng
>> - không cần import toàn bộ modules vào index.js nữa
>> - bỏ mutation: có thể thay đổi trực tiếp state
>> - hỗ trợ typescript/auto-complete/auto-import
> 4. Sử dụng SCSS, tạo layout và các example pages
> 5. Sử dụng Sespense -> tạo loading component (chỉ ở clien-side)
> 6. Sử dụng Teleport khi dùng các popups/dialogs
> 7. Sử dụng composables ~ helpers + auto-import: sử dụng hàm ở mọi chỗ (.ts,.js,.vue)
> 8. Sử dụng auto-import components
> 9. Middleware:
>> - Sử dụng: defineNuxtRouteMiddleware
>> - Nếu muốn sử dụng global thì đặt tên file: .global là được.( VD: middleware/forbidden.global.ts)
>> - Khi không có .global thì sẽ phải defined ở definePageMeta({ middleware: 'forbidden' })
> 10. Plugins:
>> - Sử dụng defineNuxtPlugin, sẽ được auto-import
>> - Cách đặt tên file sẽ quy định mode của plugin: VD: api.client.ts -> chạy ở client
> 11. SEO: sử dụng useHead để config các thẻ head
> 12. Deploy STG: config Dockerfile/cloudbuild.yaml + using secret key


