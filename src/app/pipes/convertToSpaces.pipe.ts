import { PipeTransform ,Pipe} from "@angular/core";


@Pipe({
    name:'convertToSpaces'
})
export class convertToSpacesPipe implements PipeTransform{

 transform(value:string, charString:string): string{
      return value.replace(charString,' ')
 }

}