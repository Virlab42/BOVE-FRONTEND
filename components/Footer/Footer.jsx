import Image from 'next/image'
import './Footer.scss'
import Link from 'next/link'

function Footer(){
    return(
        <>
            <footer>
              <div className='content-block'>
                <div className='footer-container'>
                  <div className='nav-container'>
                    <div className='nav-block'>
                      <Image src='/BOVE_LOGO.svg' width={500} height={300} alt='BOVE' />
                      <Link href='/catalog' className="nav-link">Каталог</Link>
                      <Link href='/about' className="nav-link">О бренде</Link>
                      <Link href='/contacts' className="nav-link">Контакты</Link>
                      <Link href='/blog' className="nav-link">Блог стилиста</Link>
                      <Link href='/info' className="nav-link">Информация</Link>
                    </div>
                  <div className='nav-contacts'>
                    <p>Следите за нами</p>
                    <div className='nav-block-connection'>
                      <Link href="" className="nav-connection">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 48C0 25.3726 0 14.0589 7.02944 7.02944C14.0589 0 25.3726 0 48 0H52C74.6274 0 85.9411 0 92.9706 7.02944C100 14.0589 100 25.3726 100 48V52C100 74.6274 100 85.9411 92.9706 92.9706C85.9411 100 74.6274 100 52 100H48C25.3726 100 14.0589 100 7.02944 92.9706C0 85.9411 0 74.6274 0 52V48Z" fill="currentColor"/>
                            <path d="M53.2082 72.042C30.4165 72.042 17.4167 56.417 16.875 30.417H28.2916C28.6666 49.5003 37.0831 57.5836 43.7498 59.2503V30.417H54.5001V46.8752C61.0835 46.1669 67.9993 38.667 70.3326 30.417H81.083C79.2913 40.5837 71.7913 48.0836 66.4579 51.1669C71.7913 53.6669 80.3334 60.2086 83.5834 72.042H71.7497C69.208 64.1253 62.8751 58.0003 54.5001 57.1669V72.042H53.2082Z" fill="#181f24"/>
                        </svg>
                      </Link>
                      <Link href="" className="nav-connection">
                        <svg width="100px" height="100px" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <circle id="Oval" fill="currentColor" cx="500" cy="500" r="500"></circle>
                                <path d="M226.328419,494.722069 C372.088573,431.216685 469.284839,389.350049 517.917216,369.122161 C656.772535,311.36743 685.625481,301.334815 704.431427,301.003532 C708.567621,300.93067 717.815839,301.955743 723.806446,306.816707 C728.864797,310.92121 730.256552,316.46581 730.922551,320.357329 C731.588551,324.248848 732.417879,333.113828 731.758626,340.040666 C724.234007,419.102486 691.675104,610.964674 675.110982,699.515267 C668.10208,736.984342 654.301336,749.547532 640.940618,750.777006 C611.904684,753.448938 589.856115,731.588035 561.733393,713.153237 C517.726886,684.306416 492.866009,666.349181 450.150074,638.200013 C400.78442,605.66878 432.786119,587.789048 460.919462,558.568563 C468.282091,550.921423 596.21508,434.556479 598.691227,424.000355 C599.00091,422.680135 599.288312,417.758981 596.36474,415.160431 C593.441168,412.561881 589.126229,413.450484 586.012448,414.157198 C581.598758,415.158943 511.297793,461.625274 375.109553,553.556189 C355.154858,567.258623 337.080515,573.934908 320.886524,573.585046 C303.033948,573.199351 268.692754,563.490928 243.163606,555.192408 C211.851067,545.013936 186.964484,539.632504 189.131547,522.346309 C190.260287,513.342589 202.659244,504.134509 226.328419,494.722069 Z" id="Path-3" fill="#181f24"></path>
                            </g>
                        </svg>
                      </Link>
                    </div>
                  </div>
                    <div className='politics'>
                      <span>© BOVÉ 2025</span>
                      <a href="/docs/политика_конфиденциальности.pdf"  type="button" data-bs-toggle="modal" data-bs-target="#сonfidentiality" className='confidentiality-footer'>Политика конфиденциальности</a>
                      <a href="/docs/согласие_на_обработку_пдн.pdf"  type="button" data-bs-toggle="modal" data-bs-target="#сonfidentiality" className='confidentiality-footer'>Пользовательское соглашение</a>
                      <p>ИНН: 420533055279</p>
                      <p>ОГРНИП: 323420500068510</p>
                    </div>
                  </div>
                </div>
              </div>

            </footer>
        </>
    )
}
export default Footer