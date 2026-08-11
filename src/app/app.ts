import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/ui/navbar/navbar';
import { FooterComponent } from './shared/ui/footer/footer';
import { ContactModalComponent } from './shared/ui/contact-modal/contact-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ContactModalComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-[#C1662F] selection:text-white relative overflow-x-hidden">
      
      <!-- Top-Right Corner Tech Network Mesh (Ultra Subtle Navy/Slate) -->
      <div class="fixed top-0 right-0 w-[180px] sm:w-[260px] md:w-[320px] h-[180px] sm:h-[260px] md:h-[320px] pointer-events-none z-0 overflow-hidden opacity-15 sm:opacity-20">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <path d="M400 20 L350 35 L380 90 L320 80 L360 140 L290 130 L340 190 L385 180" stroke="#1E2A4A" stroke-width="0.8" stroke-opacity="0.2"/>
          <path d="M350 35 L320 80 L290 130 M380 90 L360 140 L340 190" stroke="#1E2A4A" stroke-width="0.6" stroke-opacity="0.15"/>
          <path d="M400 90 L380 90 L385 180 M350 35 L400 70 M320 80 L380 90" stroke="#1E2A4A" stroke-width="0.5" stroke-opacity="0.12"/>

          <!-- Node Dots -->
          <circle cx="350" cy="35" r="2.5" fill="#1E2A4A" fill-opacity="0.5"/>
          <circle cx="380" cy="90" r="2.5" fill="#1E2A4A" fill-opacity="0.5"/>
          <circle cx="320" cy="80" r="3" fill="#3B82F6" fill-opacity="0.6"/>
          <circle cx="360" cy="140" r="2.5" fill="#1E2A4A" fill-opacity="0.5"/>
          <circle cx="290" cy="130" r="3" fill="#1E2A4A" fill-opacity="0.6"/>
          <circle cx="340" cy="190" r="2.5" fill="#3B82F6" fill-opacity="0.5"/>
        </svg>
      </div>

      <!-- Bottom-Left Corner Tech Network Mesh (Ultra Subtle Copper Glow) -->
      <div class="fixed bottom-0 left-0 w-[180px] sm:w-[260px] md:w-[320px] h-[180px] sm:h-[260px] md:h-[320px] pointer-events-none z-0 overflow-hidden opacity-20 sm:opacity-25">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <defs>
            <radialGradient id="copperGlow" cx="0" cy="400" r="250" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#C1662F" stop-opacity="0.15" />
              <stop offset="60%" stop-color="#E28A4A" stop-opacity="0.05" />
              <stop offset="100%" stop-color="#C1662F" stop-opacity="0" />
            </radialGradient>
          </defs>
          
          <rect width="400" height="400" fill="url(#copperGlow)"/>

          <!-- Network Mesh Lines -->
          <path d="M0 380 L60 350 L35 290 L100 300 L60 240 L140 250 M60 350 L100 300 L140 250 M35 290 L60 240" stroke="#C1662F" stroke-width="0.8" stroke-opacity="0.25"/>
          <path d="M0 330 L35 290 M60 350 L35 290 M100 300 L60 240" stroke="#E28A4A" stroke-width="0.6" stroke-opacity="0.18"/>

          <!-- Node Dots -->
          <circle cx="60" cy="350" r="2.5" fill="#C1662F" fill-opacity="0.6"/>
          <circle cx="35" cy="290" r="3" fill="#E28A4A" fill-opacity="0.7"/>
          <circle cx="100" cy="300" r="3" fill="#C1662F" fill-opacity="0.7"/>
          <circle cx="60" cy="240" r="2.5" fill="#C1662F" fill-opacity="0.6"/>
          <circle cx="140" cy="250" r="2.5" fill="#E28A4A" fill-opacity="0.6"/>
        </svg>
      </div>
      
      <!-- Top Sticky Navigation -->
      <app-navbar class="relative z-20" (openConsultation)="consultationModalOpen.set(true)"></app-navbar>

      <!-- Main Page Content Route Outlet -->
      <main class="flex-grow relative z-10">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <app-footer class="relative z-20"></app-footer>

      <!-- Consultation Quick Modal -->
      <app-contact-modal 
        [isOpen]="consultationModalOpen()" 
        (close)="consultationModalOpen.set(false)"
      ></app-contact-modal>

    </div>
  `
})
export class App {
  public consultationModalOpen = signal<boolean>(false);
}
