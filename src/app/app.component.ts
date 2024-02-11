import { Component } from '@angular/core';
import { TransactionsSectionComponent } from './components/transactions-section/transactions-section.component';

type AppSection = 'transactions' | 'members';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransactionsSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  sectionSelected: AppSection = 'transactions';

  handleSelectSection(section: AppSection) {
    this.sectionSelected = section;
  }
}
