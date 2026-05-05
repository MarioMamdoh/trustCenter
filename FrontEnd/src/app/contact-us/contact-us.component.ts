import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  imports: [TranslateModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  standalone: true,
})
export class ContactUsComponent {
  selectedAddressIndex = 0;
  readonly mapLinks = [
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1364.4796455871483!2d31.201154072587283!3d30.066177641087954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841473ff23e5b%3A0xdd3b7ec38e27e17!2sLife%20Medical%20Center!5e0!3m2!1sen!2seg!4v1738241663871!5m2!1sen!2seg',
    'https://maps.google.com/maps?q=Arafat%2C%20Al%20Waili%20Al%20Kabir%20Sharq%2C%20Hada%27iq%20El%20Qobbah%2C%20Cairo%20Governorate%204382542&output=embed',
  ];
  readonly externalMapLinks = [
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1364.4796455871483!2d31.201154072587283!3d30.066177641087954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841473ff23e5b%3A0xdd3b7ec38e27e17!2sLife%20Medical%20Center!5e0!3m2!1sen!2seg!4v1738241663871!5m2!1sen!2seg',
    'https://maps.app.goo.gl/9TmMMLFbxkRCB5Ya8',
  ];

  constructor(private readonly sanitizer: DomSanitizer) {}

  get selectedMapUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.mapLinks[this.selectedAddressIndex]
    );
  }

  get selectedExternalMapUrl(): string {
    return this.externalMapLinks[this.selectedAddressIndex];
  }

  selectAddress(index: number): void {
    this.selectedAddressIndex = index;
  }
}
