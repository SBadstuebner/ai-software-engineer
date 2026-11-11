import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  template: `
    <div role="status" aria-live="polite" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center">
        <div
          class="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-blue-700"
          aria-hidden="true"
        ></div>
        <p class="mt-4 text-gray-600">{{ message }}</p>
      </div>
    </div>
  `
})
export class LoadingIndicatorComponent {
  @Input({ required: true }) message!: string;
}
