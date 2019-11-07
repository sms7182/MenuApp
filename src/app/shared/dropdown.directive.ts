import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector:'[appDropdown]'
})
export class DropDownDirective{
   @HostBinding('class.open') isopen=false;
    @HostListener('click') toggleOpen(){
        debugger;
     this.isopen=!this.isopen;
    }
}