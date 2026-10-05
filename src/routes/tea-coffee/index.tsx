import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tea-coffee/')({
  component: TeaCoffeeLanding,
});

function TeaCoffeeLanding() {
  return (
    <div className="tea-coffee-landing">
      <h1>Tea & Coffee</h1>
      <p>Coming soon - Tea & Coffee collection</p>
    </div>
  );
}
