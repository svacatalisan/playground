import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {} from '@ant-design/icons-angular/icons';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';
import {
    fetchLocations,
    setSearchTerm,
} from 'app/store/slices/weather-forcast/weather-forcast.slice';

@UntilDestroy()
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    form: FormGroup;
    now = new Date();

    constructor(
        private readonly store: Store<{}>,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            searchTerm: [null, [Validators.maxLength(30)]],
        });
    }

    ngOnInit(): void {
        this.store.dispatch(fetchLocations());

        (this.form.get('searchTerm') as FormControl).valueChanges
            .pipe(debounceTime(400), untilDestroyed(this))
            .subscribe(searchTerm =>
                this.store.dispatch(setSearchTerm({ searchTerm }))
            );
    }
}
