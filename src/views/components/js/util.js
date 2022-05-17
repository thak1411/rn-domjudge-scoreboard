import Unit from './unit.js';
import Vmodel from './vmodel.js';

/**
 * <b>유틸성이 있는 함수를 모아놓는 클래스입니다.</b>
 * <pre>
 * 
 * </pre>
 */
class Util {
    constructor() {
        this.mU = Unit.makeUnit;
        this.modelIO = Vmodel.modelIO;
    }
};

export default new Util();