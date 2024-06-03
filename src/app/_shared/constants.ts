export const MONTHS = [
    { value: 1, viewValue: 'JANEIRO' },
    { value: 2, viewValue: 'FEVEREIRO' },
    { value: 3, viewValue: 'MARÇO' },
    { value: 4, viewValue: 'ABRIL' },
    { value: 5, viewValue: 'MAIO' },
    { value: 6, viewValue: 'JUNHO' },
    { value: 7, viewValue: 'JULHO' },
    { value: 8, viewValue: 'AGOSTO' },
    { value: 9, viewValue: 'SETEMBRO' },
    { value: 10, viewValue: 'OUTUBRO' },
    { value: 11, viewValue: 'NOVEMBRO' },
    { value: 12, viewValue: 'DEZEMBRO' }
  ];

export const ESTADOS = [
    { value: 'AC'},
    { value: 'AL'},
    { value: 'AP'},
    { value: 'AM'},
    { value: 'BA'},
    { value: 'CE'},
    { value: 'DF'},
    { value: 'ES'},
    { value: 'GO'},
    { value: 'MA'},
    { value: 'MT'},
    { value: 'MS'},
    { value: 'MG'},
    { value: 'PA'},
    { value: 'PB'},
    { value: 'PR'},
    { value: 'PE'},
    { value: 'PI'},
    { value: 'RJ'},
    { value: 'RN'},
    { value: 'RS'},
    { value: 'RO'},
    { value: 'RR'},
    { value: 'SC'},
    { value: 'SP'},
    { value: 'SE'},
    { value: 'TO'},
  ];

  export const ALLOWED_FILE_TYPES_CADASTRO = [
    // MS Office formats
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
    'application/vnd.ms-excel', // xls
    'application/msword', // doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
    'application/pdf', // pdf
    // Image formats
    'image/jpeg', // jpg
    'image/png', // png
    'image/gif', // gif
    'image/bmp', // bmp
    'image/tiff', // tiff
    'image/webp', // webp
    // LibreOffice formats
    'application/vnd.oasis.opendocument.text', // odt
    'application/vnd.oasis.opendocument.spreadsheet', // ods
    // Google Docs formats (when exported)
    'application/rtf', // Rich Text Format
    'text/plain' // Plain text
];