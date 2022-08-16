import { Component, Input } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';

@Component({
    selector: 'app-nav-icon',
    templateUrl: './nav-icon.component.html',
    styleUrls: ['./nav-icon.component.scss'],
})
export class NavIconComponent {
    @Input() iconType!: string;
    @Input() iconTheme!: ThemeType;
}
