import { Pipe , PipeTransform } from '@angular/core'
@Pipe({
    name:"upperPipe"
})
export class UppercasePipe implements PipeTransform{
    transform(value:String){
        const uppercaseValue = value.toUpperCase();
        return uppercaseValue;
    }
}