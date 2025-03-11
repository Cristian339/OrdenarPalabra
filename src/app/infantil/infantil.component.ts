import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-infantil',
  templateUrl: './infantil.component.html',
  styleUrls: ['./infantil.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    NgStyle
  ]
})
export class InfantilComponent implements OnInit {
  palabras: string[] = [
    'LOYOLA', 'CABALLERO', 'PAMPLONA', 'LIBROS SANTOS', 'JERUSALÉN', 'JESUITAS',
    'UN LIBRO', 'CORDERO', 'SOLDADO', 'SAN PEDRO', 'REZÓ MUCHO', 'ORANDO',
    'CAMISA', 'CUIDARLOS', 'SÍGUEME', 'ESTUDIÓ', 'SERVIRLE', 'IGLESIAS',
    'HABLAR DE DIOS', 'REZÓ POR TODOS'
  ];

// Sílabas desordenadas (para mostrar al usuario)
  silabas: string[][] = [
    ['YO', 'LO', 'LA'], // LOYOLA
    ['BA', 'CA', 'RO', 'LLE'], // CABALLERO
    ['PLO', 'PAM', 'NA'], // PAMPLONA
    ['BROS', 'LI', 'TOS', 'SAN'], // LIBROS SANTOS
    ['RU', 'JE', 'LÉN', 'SA'], // JERUSALÉN
    ['JE', 'TAS', 'SUI'], // LOS JESUITAS
    ['UN', 'LI', 'BRO'], // UN LIBRO
    ['COR', 'RO', 'DE'], // UN CORDERO
    ['SOL', 'DO', 'DA'], // FUE SOLDADO
    ['PE', 'SAN', 'DRO'], // SAN PEDRO
    ['ZÓ', 'RE', 'CHO', 'MU'], // REZÓ MUCHO
    ['RAN', 'DO', 'O'], // CONTEMPLAR
    ['CA','SA', 'MI'], // SU CAMISA
    ['CUI', 'LOS', 'DAR'], // LOS CUIDÓ
    ['GUE', 'SÍ', 'ME'], // SÍGUEME
    ['TU', 'ES', 'DIÓ'], // ESTUDIÓ
    ['VIR', 'SER', 'LE'], // SERVIRLE
    ['SIAS', 'I', 'GLE'], // FUNDÓ IGLESIAS
    ['BLAR', 'HA', 'DIOS', 'DE'], // HABLAR DE DIOS
    ['ZÓ', 'RE', 'DOS', 'POR', 'TO'] // REZÓ POR TODOS
  ];

// Sílabas ordenadas (para verificar la respuesta)
  silabasOrdenadas: string[][] = [
    ['LO', 'YO', 'LA'], // LOYOLA
    ['CA', 'BA', 'LLE', 'RO'], // CABALLERO
    ['PAM', 'PLO', 'NA'], // PAMPLONA
    ['LI', 'BROS', 'SAN', 'TOS'], // LIBROS SANTOS
    ['JE', 'RU', 'SA', 'LÉN'], // JERUSALÉN
    ['JE', 'SUI', 'TAS'], // LOS JESUITAS
    ['UN', 'LI', 'BRO'], // UN LIBRO
    ['COR', 'DE', 'RO'], // UN CORDERO
    ['SOL', 'DA', 'DO'], // FUE SOLDADO
    ['SAN', 'PE', 'DRO'], // SAN PEDRO
    ['RE', 'ZÓ', 'MU', 'CHO'], // REZÓ MUCHO
    ['O', 'RAN', 'DO'], // CONTEMPLAR CAMBIAR
    ['CA', 'MI', 'SA'], // SU CAMISA
    ['CUI', 'DAR', 'LOS'], // LOS CUIDÓ CAMBIAR
    ['SÍ', 'GUE', 'ME'], // SÍGUEME
    ['ES', 'TU', 'DIÓ'], // ESTUDIÓ
    ['SER', 'VIR', 'LE'], // SERVIRLE
    ['I', 'GLE', 'SIAS'], // FUNDÓ IGLESIAS
    ['HA', 'BLAR', 'DE', 'DIOS'], // HABLAR DE DIOS
    ['RE', 'ZÓ', 'POR', 'TO', 'DOS'] // REZÓ POR TODOS
  ];

  preguntas: string[] = [
    '¿Cómo se llamaba el castillo donde nació San Ignacio?',
    '¿Qué quería ser San Ignacio cuando era joven?',
    '¿En qué batalla fue herido San Ignacio?',
    '¿Qué leyó San Ignacio mientras se recuperaba de sus heridas?',
    '¿A qué ciudad fue San Ignacio para convertirse en sacerdote?',
    '¿Qué fundó San Ignacio?',
    '¿Qué escribió San Ignacio para rezar?', // Pregunta simplificada
    '¿Qué animal vio San Ignacio en una visión?',
    '¿Qué hizo San Ignacio antes de ser sacerdote?',
    '¿A qué santo le rezaba San Ignacio?',
    '¿Qué hizo San Ignacio en Manresa?',
    '¿Cómo contemplaba San Ignacio la naturaleza?',
    '¿Qué le regaló San Ignacio a un niño pobre?',
    '¿Qué hizo San Ignacio para ayudar a los enfermos?',
    '¿Qué le dijo Jesús a San Ignacio en una visión?',
    '¿Qué hizo San Ignacio en París?',
    '¿Qué prometió San Ignacio a Dios?',
    '¿Qué hizo San Ignacio en Roma?',
    '¿Qué le gustaba hacer a San Ignacio con sus amigos?',
    '¿Qué hizo San Ignacio antes de morir?'
  ];
  imagenes: string[] = [
    'https://imgs.search.brave.com/9uZ-IF-ViKXo9HpfsXk1A3pMBV435f1mlJjWKtNNO98/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mb3Rv/Z3JhZmlhcy5sYXNl/eHRhLmNvbS9jbGlw/cGluZy9jbXNpbWFn/ZXMwMi8yMDIzLzA5/LzIwLzVGNTUyMjMz/LTM1Q0YtNDNFMi1B/MjBBLUEyQjQ1MEIx/NzU0NC9zYW50dWFy/aW8tbG95b2xhXzk4/LmpwZz9jcm9wPTEy/ODAsNzIwLHgwLHkx/MjAmd2lkdGg9MTkw/MCZoZWlnaHQ9MTA2/OSZvcHRpbWl6ZT1o/aWdoJmZvcm1hdD13/ZWJwbHk',
    'https://imgs.search.brave.com/AiB7AakNOXZ5paaFfUZGnMqVFMFoQnV5-wdzsbHM23A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTA5/NDg0MTg3OC9lcy92/ZWN0b3IvY2FiYWxs/ZXJvLWNvbi1sYW56/YS1jYWJhbGxvLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1X/ZW1zR3N6NUl3bnFQ/eFFaM1oybFFZcXFq/ODVMQVEyQUgwclN1/M090S1FrPQ',
    'https://imgs.search.brave.com/RPJykz0TT3ShzO_jhCT_WPXY9r9QtcFfYXiaoRf7Ag4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9saXZl/LnN0YXRpY2ZsaWNr/ci5jb20vMjcyOC8x/MzIxMTQ1OTY2NV81/ZTMyZWIyNDQ2Lmpw/Zw',
    'https://imgs.search.brave.com/ln2J0GFiFWRx2wFw-71wk-9YXX5QtnpeIgd1W3WJjDE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFVbktyUjRPWEwu/anBn',
    'https://imgs.search.brave.com/hdvqN4Jcr3zPeeF4d4NPDHAyDCCkubkysNOpVUjTQ94/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYw/OTQ1MTYzL2VzL2Zv/dG8vamVydXNhbCVD/MyVBOW4uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPWFkQXpC/SFNkdXY4WXlqdTUz/ZG5qZTgwRllwdElO/bWZIV2g0UU4tNU14/UEE9',
    'https://imgs.search.brave.com/C5y5t9T69G8CmWJ12hJ9wmCtT02F8h4pgXeWajCdIYk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9nY2xv/eW9sYS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTkvMTEv/NjczMS1Mb3MtamVz/dWl0YXMuanBn',
    'https://imgs.search.brave.com/6LwEU6XKuShO-hAQOUenxiKKYUGYj-UK7FE2RihxMdw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgy/Njc1NzQyL3Bob3Rv/L2Jvb2tzLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz05aVhS/ZE1zM3NOMjVpSHll/NWtBRkJxRDRUcjFJ/VlI0SVk4Z1hHOGJr/VE1VPQ',
    'https://imgs.search.brave.com/uN901SEaHwFNdN_IdtQsj3-4l_oyg3O6i8S8pG30W2Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9lbm1l/cmpvc2EuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE1LzA1/LzE1LUNvcmRlcm8t/NjAweDI3MC5qcGc',
    'https://imgs.search.brave.com/Wt3JM0vf_48iJOxBkH2s-Ib8sVM8O0lCbxnrjSxbQQY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTIx/NjQ1NDMwL2VzL2Zv/dG8vc2lsaG91ZXR0/ZS1vZi1zb2xkaWVy/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9dFlsaElXTTF3/YWY4WDdEWVpPUk9R/M0hzX19fVGJZQWlC/Z0xJamFpc1NzYz0',
    'https://imgs.search.brave.com/q_SRrOLfYPcm7qhbBSpmtQSLaH3-Z8Yfo4q8uJH4Q64/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2FucGVkcm9hcG9z/dG9sLmVzL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzAzL3Nh/bi1wZWRyby5qcGc',
    'https://imgs.search.brave.com/SImlby9nFK4d-63Edld5nPAimP9Pi912-YclXOvf3pc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8x/LzEwL1NBU1NPRkVS/UkFUT18tX1Zpcmdl/bl9yZXphbmRvXyhO/YXRpb25hbF9HYWxs/ZXJ5LF9Mb25kcmVz/LF8xNjQwLTUwKS5q/cGc',
    'https://imgs.search.brave.com/O3SKL9a0cAePuYSxdl-2y36CVFH6qB2IEUF8lbb_gRQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ1/NjQzODQ2OC9lcy9m/b3RvL3BhcmVqYS1v/cmFuZG8tanVudG9z/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1mdXVQZjdQS2lT/NG9EakV0T1BqRVVu/R1lmV2JtTDh3Yjdh/QUJLQ3ZIS0lBPQ',
    'https://imgs.search.brave.com/RVFnjJbB4o0zTIcke3N4S4QhaX5uN986nuNshnCpG0E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTY1/OTY5ODI2L2VzL3Zl/Y3Rvci9ob21icmVz/LWRlLWNhbWlzZXRh/cy1kaWJ1am8uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPVdi/Q3M2bER2VDNvTW1C/ZFl6SVZxMVJnMUpQ/Z0doTkNqcVBjSlh0/a05oUXM9',
    'https://imgs.search.brave.com/mpq1jqujVQ31SKRQd9NzF2RlFQf31BTSWuuez5vK_uY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY1/NzI4MzA5L2VzL3Zl/Y3Rvci9sb3MtY3Vp/ZGFkb3Jlcy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9elhW/Q1FNNDllNGdzN1Zt/RUxPQUVDN0s4aFFE/SGlkY2ZBRGVBNURl/NzM0ND0',
    'https://imgs.search.brave.com/G_s_o2Gz6671gHWt9IYxrNTL_ec3zlB7pUDoP2IQkcw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/dmVjdG9yLXByZW1p/dW0vY3Jpc3RpYW5v/cy1qZXN1cy1wcmVk/aWNhbmRvLWNvbG9y/ZWFyLXBhZ2luYS1u/aW5vc185NTE3Nzgt/OTA0OS5qcGc_c2Vt/dD1haXNfaHlicmlk',
    'https://imgs.search.brave.com/bYIDr0wlOS5Mn2IUSImTcDOE5f4SO3uxv6uUE_AY3hU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/ZXN0dWRpYW50ZS1k/YW1hLWVzY3JpYmll/bmRvLWN1YWRlcm5v/LWFiaWVydG8tbGFw/aXpfMTE2My0yNTQ2/LmpwZz9zZW10PWFp/c19oeWJyaWQ',
    'https://imgs.search.brave.com/dbDo-10CqN03n-o3mDL01XSCN-dfKnfvnRpM1Tq_YQ0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly92ZXJz/aWN1bG9zLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8x/MC9WZXJzaWN1bG9z/LXBhcmEtaG9ucmFy/LWEtbG9zLVBhZHJl/cy0zMDB4MjAwLmpw/Zw',
    'https://imgs.search.brave.com/03yP3e_YdoHVjsf9y8Yqt8oRO20BtiRC3I-e0VZP24M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YmFybmFjZW50cmUu/Y29tL21lZGlhL2Jh/cm5hY2VudHJlL2lt/YWdlL3R1cmlzbW8v/MTJfRm90by4xNTgz/MTY2MDY5LmpwZw',
    'https://imgs.search.brave.com/EbBPBrfXgSv9_i-qRTlS1cgscYjXBEZfRJRRsd1CWSo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9hbWlnYWJsZS1m/aWd1cmEtZGlvcy1k/aWJ1am9zLWFuaW1h/ZG9zLWJyYXpvcy1h/YmllcnRvc185ODE2/NjgtMTI5MTYuanBn/P3NlbXQ9YWlzX2h5/YnJpZA',
    'https://imgs.search.brave.com/w-IHrB-lRkQn73Y72k1o6hi-ClxxtDMBWU1lh_LBsMI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zLnlp/bWcuY29tL255L2Fw/aS9yZXMvMS4yL1N0/aVd2TDEwZDllRnpu/ZTVUUE1hY0EtLS9Z/WEJ3YVdROWFHbG5h/R3hoYm1SbGNqdDNQ/VEV5TkRJN2FEMDRN/amctL2h0dHBzOi8v/bWVkaWEuemVuZnMu/Y29tL2VzL2xhbmFj/aW9uLmNvbS5hci83/YmJmNTQwNmFhODRm/NjBiZGJhYmI5MTA2/ODA3YjBmZA.jpeg',
    'https://imgs.search.brave.com/cYjxnvFfLLeGevVENHSq98ethjF5Rbi-MGUhrXd0x-I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2VzdGFzZGVtaW1i/cmUuY29tL3VwbG9h/ZHMvY2VzdGFzZGVt/aW1icmUvcHJvZHVj/dG9zL21fNzUwNDdf/VGFyamV0YV9lbmhv/cmFidWVuYV9mbG9y/ZXMuanBn'
  ];
  fondos: string[] = [
    'https://img.freepik.com/vector-gratis/fondo-acuarela-mariposas-flores_23-2148889970.jpg',
    'https://imgs.search.brave.com/Y860ZjTz-9b92HL3TFcG6AQEqJn4RkKvk1EC8x0q8xw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9wYXJlZC1jb3Jh/em9uZXMtZXN0cmVs/bGFzLWZvbmRvLXJv/c2FfODY3MjU1LTMy/NS5qcGc_c2VtdD1h/aXNfaHlicmlk',
    'https://imgs.search.brave.com/yXWZGQNuVowjIxU2qPmWk6LluYhSVeUjNIFovZ8eAiA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzYxLzg2Lzk1/LzM2MF9GXzg2MTg2/OTUyOV9MajFwd0FF/YWNQV2x5UlZQNGR2/aXJSWjlKbEk1Y0Zh/OC5qcGc',
    'https://static.wixstatic.com/media/b39505_9145786146ee41e894beb23b880c1ab5~mv2.jpg/v1/fill/w_725,h_559,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b39505_9145786146ee41e894beb23b880c1ab5~mv2.jpg',
    'https://imgs.search.brave.com/TCpwFje-8kTX-mHu69PrlvJtXlGFhPjReUoxxHAIi6I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM3/MDkxNjUwMy9lcy9m/b3RvL2NoaWxkcy1k/cmF3aW5nLW9mLXN1/bnMtc2VhbWxlc3Mt/cGF0dGVybi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9WGF3/QXIwanZoX2FTcXdk/VEJLa0l4OUU4Q3pu/NEk1LWp4SW1qdHNm/Y0w2cz0\n',
    'https://imgs.search.brave.com/Gzo2M3ot-YWA3s19Iq5zQm250ci5Rt7C2oe7eNqtvKA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHNkLWdyYXRpcy9m/b25kby1tYXRlcm5p/ZGFkLWJhYnktc2hv/d2VyXzIzLTIxNTAy/MzcyMzEuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZA',
    'https://imgs.search.brave.com/wE881Zj1EUbqD6w_2wBQDQEvKo8X4nBVXPP-T5VZlpo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjIx/MTM2MjI2L2VzL2Zv/dG8vZWwtdG95LWVz/dCVDMyVBMS1zZW50/YWRvLWVuLWxvcy1w/YSVDMyVCMWFsZXMu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PVJ3aW5LU2lNRmQy/X012NWhjdEI1ZHdj/ZWNqbmxCeWkzd204/UERvODhjemc9',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-mariposas-flores_23-2148889970.jpg',
    'https://imgs.search.brave.com/Y860ZjTz-9b92HL3TFcG6AQEqJn4RkKvk1EC8x0q8xw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9wYXJlZC1jb3Jh/em9uZXMtZXN0cmVs/bGFzLWZvbmRvLXJv/c2FfODY3MjU1LTMy/NS5qcGc_c2VtdD1h/aXNfaHlicmlk',
    'https://imgs.search.brave.com/yXWZGQNuVowjIxU2qPmWk6LluYhSVeUjNIFovZ8eAiA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzYxLzg2Lzk1/LzM2MF9GXzg2MTg2/OTUyOV9MajFwd0FF/YWNQV2x5UlZQNGR2/aXJSWjlKbEk1Y0Zh/OC5qcGc',
    'https://static.wixstatic.com/media/b39505_9145786146ee41e894beb23b880c1ab5~mv2.jpg/v1/fill/w_725,h_559,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b39505_9145786146ee41e894beb23b880c1ab5~mv2.jpg',
    'https://imgs.search.brave.com/TCpwFje-8kTX-mHu69PrlvJtXlGFhPjReUoxxHAIi6I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM3/MDkxNjUwMy9lcy9m/b3RvL2NoaWxkcy1k/cmF3aW5nLW9mLXN1/bnMtc2VhbWxlc3Mt/cGF0dGVybi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9WGF3/QXIwanZoX2FTcXdk/VEJLa0l4OUU4Q3pu/NEk1LWp4SW1qdHNm/Y0w2cz0\n',
    'https://imgs.search.brave.com/Gzo2M3ot-YWA3s19Iq5zQm250ci5Rt7C2oe7eNqtvKA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHNkLWdyYXRpcy9m/b25kby1tYXRlcm5p/ZGFkLWJhYnktc2hv/d2VyXzIzLTIxNTAy/MzcyMzEuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZA',
    'https://imgs.search.brave.com/wE881Zj1EUbqD6w_2wBQDQEvKo8X4nBVXPP-T5VZlpo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjIx/MTM2MjI2L2VzL2Zv/dG8vZWwtdG95LWVz/dCVDMyVBMS1zZW50/YWRvLWVuLWxvcy1w/YSVDMyVCMWFsZXMu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PVJ3aW5LU2lNRmQy/X012NWhjdEI1ZHdj/ZWNqbmxCeWkzd204/UERvODhjemc9',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-mariposas-flores_23-2148889970.jpg',
    'https://imgs.search.brave.com/Y860ZjTz-9b92HL3TFcG6AQEqJn4RkKvk1EC8x0q8xw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9wYXJlZC1jb3Jh/em9uZXMtZXN0cmVs/bGFzLWZvbmRvLXJv/c2FfODY3MjU1LTMy/NS5qcGc_c2VtdD1h/aXNfaHlicmlk',
    'https://imgs.search.brave.com/yXWZGQNuVowjIxU2qPmWk6LluYhSVeUjNIFovZ8eAiA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzYxLzg2Lzk1/LzM2MF9GXzg2MTg2/OTUyOV9MajFwd0FF/YWNQV2x5UlZQNGR2/aXJSWjlKbEk1Y0Zh/OC5qcGc',
    'https://static.wixstatic.com/media/b39505_9145786146ee41e894beb23b880c1ab5~mv2.jpg/v1/fill/w_725,h_559,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b39505_9145786146ee41e894beb23b880c1ab5~mv2.jpg',
    'https://imgs.search.brave.com/TCpwFje-8kTX-mHu69PrlvJtXlGFhPjReUoxxHAIi6I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM3/MDkxNjUwMy9lcy9m/b3RvL2NoaWxkcy1k/cmF3aW5nLW9mLXN1/bnMtc2VhbWxlc3Mt/cGF0dGVybi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9WGF3/QXIwanZoX2FTcXdk/VEJLa0l4OUU4Q3pu/NEk1LWp4SW1qdHNm/Y0w2cz0\n',
    'https://imgs.search.brave.com/Gzo2M3ot-YWA3s19Iq5zQm250ci5Rt7C2oe7eNqtvKA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHNkLWdyYXRpcy9m/b25kby1tYXRlcm5p/ZGFkLWJhYnktc2hv/d2VyXzIzLTIxNTAy/MzcyMzEuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZA',
    'https://imgs.search.brave.com/wE881Zj1EUbqD6w_2wBQDQEvKo8X4nBVXPP-T5VZlpo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjIx/MTM2MjI2L2VzL2Zv/dG8vZWwtdG95LWVz/dCVDMyVBMS1zZW50/YWRvLWVuLWxvcy1w/YSVDMyVCMWFsZXMu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PVJ3aW5LU2lNRmQy/X012NWhjdEI1ZHdj/ZWNqbmxCeWkzd204/UERvODhjemc9'
  ];
  huecos: string[] = [];
  palabraActualIndex: number = 0;
  mensaje: string = '';
  fondo: string = this.fondos[0]; // Fondo inicial
  animacion: string = '';
  puntos: number = 0; // Contador de puntos
  groupName: string = '';
  intentosFallidos: number = 0; // Contador de intentos fallidos

  // URLs de sonidos (reemplaza con tus propios archivos si es necesario)
  sonidoCorrecto: string = 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3';
  sonidoIncorrecto: string = 'https://www.soundjay.com/misc/sounds/fail-trombone-03.mp3';
  dragSoundUrl: string = 'https://www.soundjay.com/buttons/sounds/button-32.mp3';
  dropSoundUrl: string = 'https://www.soundjay.com/buttons/sounds/button-31.mp3';

  // Objetos de audio para precargar los sonidos
  audioCorrecto: HTMLAudioElement;
  audioIncorrecto: HTMLAudioElement;
  dragSound: HTMLAudioElement;
  dropSound: HTMLAudioElement;


  constructor(private route: ActivatedRoute) {
    // Precargar los sonidos
    this.audioCorrecto = new Audio(this.sonidoCorrecto);
    this.audioIncorrecto = new Audio(this.sonidoIncorrecto);
    this.dragSound = new Audio(this.dragSoundUrl);
    this.dropSound = new Audio(this.dropSoundUrl);
  }

  ngOnInit() {
    this.inicializarHuecos();
    this.route.queryParams.subscribe(params => {
      this.groupName = params['groupName'] || '';
    });

    this.inicializarHuecos();
  }

  inicializarHuecos() {
    this.huecos = Array(this.silabas[this.palabraActualIndex].length).fill('');
  }

  onDragStart(event: DragEvent, silaba: string) {
    event.dataTransfer?.setData('text/plain', silaba);
    this.reproducirSonido(this.dragSound);
  }

  onDrop(event: DragEvent, huecoIndex: number) {
    event.preventDefault();
    this.reproducirSonido(this.dropSound);
    const silaba = event.dataTransfer?.getData('text/plain');
    if (silaba) {
      this.huecos[huecoIndex] = silaba;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  verificarRespuesta() {
    const silabasCorrectas = this.silabasOrdenadas[this.palabraActualIndex]; // Usar silabasOrdenadas para verificar
    if (this.huecos.every((hueco, index) => hueco === silabasCorrectas[index])) {
      this.reproducirSonido(this.audioCorrecto);
      this.mensaje = '¡Correcto!';
      this.animacion = 'correcto';
      this.fondo = this.fondos[this.palabraActualIndex]; // Cambiar fondo
      this.puntos += 10; // Sumar 10 puntos
      this.intentosFallidos = 0; // Reiniciar contador de intentos fallidos
      setTimeout(() => {
        this.palabraActualIndex++;
        if (this.palabraActualIndex < this.palabras.length) {
          this.inicializarHuecos();
          this.mensaje = '';
          this.animacion = '';
        } else {
          this.mensaje = '¡Has completado todas las preguntas!';
        }
      }, 1000);
    } else {
      this.reproducirSonido(this.audioIncorrecto);
      this.mensaje = 'Incorrecto';
      this.animacion = 'incorrecto';
      this.intentosFallidos++; // Incrementar contador de intentos fallidos

      if (this.intentosFallidos >= 2) {
        setTimeout(() => {
          this.palabraActualIndex++;
          if (this.palabraActualIndex < this.palabras.length) {
            this.inicializarHuecos();
            this.mensaje = '';
            this.animacion = '';
            this.intentosFallidos = 0; // Reiniciar contador de intentos fallidos
          } else {
            this.mensaje = '¡Has completado todas las preguntas!';
          }
        }, 1000);
      }
    }
  }

  reproducirSonido(audio: HTMLAudioElement) {
    audio.currentTime = 0; // Reiniciar el sonido si ya estaba reproduciéndose
    audio.play();
  }
}
