import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-wrapper.component.html',
    styleUrls: ['./input-wrapper.component.scss'],
})
export class InputTextComponent {
    @Input('form') form!: FormGroup;
    @Input('control') control!: string;
    @Input('placeholder') placeholder?: string;
    @Input('className') className?: string;
    @Input('onFocus') onFocus?: () => void;
    @Input('onBlur') onBlur?: () => void;

    constructor() {}
}
