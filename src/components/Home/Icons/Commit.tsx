import React from "react"
import { css } from "@emotion/core"

type CommitProps = {
  className?: string
  width?: number
  height?: number
  color?: string
}

const Commit: React.FC<CommitProps> = ({ className, width, height, color }) => (
  <svg
    viewBox="0 0 20 20"
    className={className}
    width={width}
    height={height}
    css={css`
      ${color && `fill: ${color};`}
    `}
  >
    <path d="M19.6223 9.108L10.8903 0.376451C10.6481 0.135354 10.3203 0 9.97867 0C9.63698 0 9.30921 0.135354 9.06706 0.376451L7.25785 2.18798L9.55712 4.48865C9.8284 4.39697 10.1199 4.38316 10.3987 4.44878C10.6774 4.51441 10.9322 4.65684 11.1341 4.85993C11.336 5.06301 11.4769 5.31862 11.541 5.59777C11.605 5.87691 11.5895 6.16842 11.4963 6.43922L13.7106 8.65687C14.0384 8.54182 14.3956 8.54177 14.7235 8.65674C15.0514 8.7717 15.3303 8.99484 15.5146 9.28944C15.6988 9.58405 15.7773 9.93259 15.7372 10.2778C15.6971 10.6229 15.5407 10.9441 15.2938 11.1886C14.6947 11.7888 13.7276 11.7888 13.1275 11.1886C12.9144 10.9752 12.7688 10.7037 12.7088 10.4081C12.6489 10.1125 12.6773 9.80572 12.7905 9.52612L10.7163 7.46252V12.9011C10.8623 12.9721 11.0023 13.0702 11.1233 13.1912C11.4092 13.4792 11.5697 13.8686 11.5697 14.2745C11.5697 14.6804 11.4092 15.0698 11.1233 15.3578C10.9806 15.5008 10.8112 15.6142 10.6246 15.6915C10.4381 15.7689 10.2381 15.8087 10.0362 15.8087C9.83423 15.8087 9.63427 15.7689 9.44772 15.6915C9.26118 15.6142 9.09173 15.5008 8.94905 15.3578C8.80668 15.2158 8.69372 15.0471 8.61665 14.8614C8.53958 14.6757 8.49991 14.4766 8.49991 14.2755C8.49991 14.0744 8.53958 13.8753 8.61665 13.6896C8.69372 13.5039 8.80668 13.3352 8.94905 13.1932C9.10106 13.0431 9.27108 12.9291 9.4531 12.8541V7.36249C9.26611 7.28592 9.09614 7.17304 8.95302 7.03038C8.8099 6.88771 8.69647 6.71809 8.61929 6.53132C8.5421 6.34455 8.50269 6.14434 8.50332 5.94224C8.50396 5.74015 8.54464 5.54018 8.62301 5.3539L6.36274 3.08224L0.375044 9.06599C-0.125015 9.57013 -0.125015 10.3864 0.375044 10.8905L9.10706 19.6221C9.22654 19.7419 9.36847 19.8369 9.52472 19.9018C9.68098 19.9666 9.84849 20 10.0177 20C10.1868 20 10.3544 19.9666 10.5106 19.9018C10.6669 19.8369 10.8088 19.7419 10.9283 19.6221L19.6193 10.9305C19.7397 10.8114 19.8353 10.6695 19.9006 10.5132C19.9659 10.357 19.9997 10.1893 20 10.0199C20.0003 9.85049 19.967 9.68271 19.9022 9.52621C19.8374 9.3697 19.7423 9.22757 19.6223 9.108" />
  </svg>
)

export { Commit }
