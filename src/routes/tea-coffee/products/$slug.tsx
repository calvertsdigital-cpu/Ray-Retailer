import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tea-coffee/products/$slug')({
  component: ProductDetail,
});

function ProductDetail() {
  return (
    <div className="product-detail">
      <h1>Product Detail</h1>
      <p>Coming soon - Product information</p>
    </div>
  );
}
