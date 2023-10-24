import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from "./components/service/data.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CandidatosPorEstadoModel} from "./components/model/candidatos-por-estado.model";
import {MediaImcIdadeModel} from "./components/model/media-imc-idade.model";
import {PercentualObesosModel} from "./components/model/percentual-obesos.model";
import {DadosTipoSanguineoModel} from "./components/model/dados-tipo-sanguineo.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements AfterViewInit {
  pageSize = 10; // Quantidade de itens por página
  pageIndex = 0; // Página inicial
  candidatoEstado: Array<CandidatosPorEstadoModel> = new Array<CandidatosPorEstadoModel>();
  mediaImcIdade: Array<MediaImcIdadeModel> = new Array<MediaImcIdadeModel>();
  percentualObesos: Array<PercentualObesosModel> = new Array<PercentualObesosModel>();
  mediaPorIdade: Array<DadosTipoSanguineoModel> = new Array<DadosTipoSanguineoModel>();
  qtdDoadores: Array<DadosTipoSanguineoModel> = new Array<DadosTipoSanguineoModel>();
  panelOpenState = false;
  title = 'teste-conhecimento-angular';
  json: any

  @ViewChild('topAnchor', {static: true}) topAnchor!: ElementRef | undefined;

  constructor(private dataService: DataService, private _snackBar: MatSnackBar) {
    this.topAnchor = {} as ElementRef;
  }

  ngAfterViewInit() {
    if (this.topAnchor) {
      this.topAnchor.nativeElement.addEventListener('click', (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
      });
    } else {
      console.error('topAnchor is undefined'); // Tratamento de erro ou mensagem de log, se desejado
    }
  }

  importFile() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      this.readFile(file);
    });
    inputElement.click();
  }

  readFile(file: File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e && e.target) {
        const fileContents = e.target.result;

        try {
          if (typeof fileContents === "string") {
            this.json = JSON.parse(fileContents);
            this.dataService.postJson(this.json).subscribe(r => {
              this._snackBar.open("JSON importado com sucesso", "fechar", {
                duration: 5000, // A duração em milissegundos
              });
              this.candidatoEstado = r.candidatosPorEstadoDTOList
              this.mediaImcIdade = r.mediaImcIdadeDTOS
              this.percentualObesos = r.percentualObesosDTOS
              this.mediaPorIdade = r.dadosTipoSanguineoDTOS
              this.qtdDoadores = r.dadosTipoSanguineoDTOS
            })
          }
        } catch (error) {
          this._snackBar.open("O arquivo não é um JSON válido", "fechar", {
            duration: 5000, // A duração em milissegundos
          });
          return;
        }
      }
    };

    reader.readAsText(file);
  }

  updateDataSource(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
