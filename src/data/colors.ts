/*
 *  Copyright (c) Alexis Fiolleau <fiolleaua@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  ATTENTION! FREE SOFTWARE
 *  This website is free software (free as in freedom).
 *  If you use any part of this code, you must make your entire project's source code
 *  publicly available under the same license. This applies whether you modify the code
 *  or use it as it is in your own project. This ensures that all modifications and
 *  derivative works remain free software, so that everyone can benefit.
 *  If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 *  For full license terms and conditions, you can read the AGPL-3.0 here:
 *  https://www.gnu.org/licenses/agpl-3.0.html
 */

type HexColor = `#${string}`; // Not strict, but conveys intent
type RGBColor = `${number}, ${number}, ${number}`; // Not strict, but conveys intent
export interface Color {
  name: string;
  hex: HexColor;
  rgb: RGBColor;
}

// The color palette used throughout the website
export const colors: Color[] = [
  {
    name: `blue-jeans`,
    hex: `#5EB9E6`,
    rgb: `94, 185, 230`,
  },
  {
    name: `sasquatch-socks`,
    hex: `#FA397A`,
    rgb: `250, 57, 122`,
  },
  {
    name: `rajah`,
    hex: `#FFA65D`,
    rgb: `255, 166, 93`,
  },
  {
    name: `corn`,
    hex: `#F9E561`,
    rgb: `249, 229, 97`,
  },
  {
    name: `eucalyptus`,
    hex: `#53D0B1`,
    rgb: `83, 208, 177`,
  },
] as const satisfies Color[];
