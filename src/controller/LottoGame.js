import Input from '../view/Input.js';
import Output from '../view/Output.js';
import Buyer from '../model/Buyer.js';
import Util from '../utils/Util.js';
import WinLotto from '../model/WinLotto.js';

class LottoGame {
  #buyer;

  #winLotto;

  #bonusLotto;

  async start() {
    await this.setBuyer();
    this.printPurchaseInfo();
    await this.setWinLotto();
    await this.setBonusLotto();
  }

  async setBuyer() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const lottoBudget = await Input.getLottoBudget();
      try {
        this.#buyer = new Buyer(lottoBudget);
        break;
      } catch (error) {
        Output.print(error.message);
      }
    }
  }

  async setWinLotto() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const winLotto = await Input.getWinLotto();
      const parsedWinLotto = Util.splitStringToNumberArray(winLotto);
      try {
        this.#winLotto = new WinLotto(parsedWinLotto);
        break;
      } catch (error) {
        Output.print(error.message);
      }
    }
  }

  async setBonusLotto() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const bonusLotto = await Input.getBonusLotto();
      try {
        this.#winLotto.setBonusLotto(Number(bonusLotto));
        this.#bonusLotto = this.#winLotto.getBonusLotto();
        break;
      } catch (error) {
        Output.print(error.message);
      }
    }
  }

  printPurchaseInfo() {
    Output.printPurchaseCount(this.#buyer.getPurchaseCount());
    Output.printPurchasedLottoList(this.#buyer.getLottoList());
  }
}

export default LottoGame;
