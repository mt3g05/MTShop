import { useId } from 'react';

// Minh hoạ SVG nội bộ: không cần tải ảnh bên ngoài khi chạy bài tập.
export default function ProductVisual({ color = '#b1c6a4', type = 'pump', label = 'GENTLE CLEANSER' }) {
  const id = useId().replaceAll(':', '');
  return <svg viewBox="0 0 240 280" aria-hidden="true" focusable="false" className={`product-visual ${type}`}>
    <defs>
      <linearGradient id={`shade-${id}`} x1="0" x2="1"><stop stopColor="#fff" stopOpacity=".42" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#142f22" stopOpacity=".2" /></linearGradient>
      <filter id={`shadow-${id}`}><feGaussianBlur stdDeviation="5" /></filter>
    </defs>
    <ellipse cx="123" cy="258" rx="65" ry="9" fill="#294734" opacity=".15" filter={`url(#shadow-${id})`} />
    {type === 'jar' ? <>
      <rect x="47" y="142" width="146" height="106" rx="25" fill={color} />
      <rect x="43" y="126" width="154" height="31" rx="9" fill="#f0eade" />
      <rect x="47" y="156" width="146" height="92" rx="20" fill={`url(#shade-${id})`} />
      <rect x="62" y="174" width="116" height="53" rx="2" fill="#f5f2e8" />
    </> : type === 'tube' ? <>
      <path d="M65 52H175L161 230H79Z" fill={color} />
      <path d="M65 52H175L161 230H79Z" fill={`url(#shade-${id})`} />
      <rect x="78" y="228" width="84" height="25" rx="4" fill="#e8e4d8" />
      <path d="M77 122H163L158 208H82Z" fill="#f5f2e8" />
    </> : <>
      <rect x="99" y="49" width="43" height="24" rx="4" fill="#e9e4d7" />
      <path d="M110 48V31Q110 22 120 22H166V33H133V48Z" fill="#ece8de" />
      <rect x="65" y="70" width="112" height="181" rx="22" fill={color} />
      <rect x="65" y="70" width="112" height="181" rx="22" fill={`url(#shade-${id})`} />
      <rect x="79" y="125" width="84" height="88" rx="2" fill="#f5f2e8" />
    </>}
    <g fill="#315344" textAnchor="middle" fontFamily="Georgia, serif">
      <text x="120" y={type === 'jar' ? 192 : 153} fontSize="17">MTShop</text>
      <text x="120" y={type === 'jar' ? 207 : 175} fontSize="5.7" letterSpacing=".5">{label}</text>
      <text x="120" y={type === 'jar' ? 219 : 196} fontSize="5" letterSpacing="2">DAILY CARE</text>
    </g>
  </svg>;
}
