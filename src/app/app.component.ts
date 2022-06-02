import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    menuMode = 'sidebar';

    darkMode = 'dark';

    topbarTheme = 'dark';

    menuTheme = 'dark';

    inputStyle = 'outlined';

    ripple: boolean;

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.darkMode = 'dark';
        this.topbarTheme = 'dark';
        this.menuTheme = 'dark';
    }
}
