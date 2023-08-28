/**
 * 该脚本将混入(mixin)到表单文件中
 * this.form 表单实例
 * this.models 表单数据
 * this.$http 发送请求
 */
export default {
  watch: {
    "models.fld_11713_54": {
      handler(newVal) {
        console.log(newVal);
        this.handleChangeSuggestion();
      },
      immediate: true,
    },
    "models.fld_11713_53": {
      handler(newVal) {
        console.log(newVal);
        this.handleChangeSuggestion();
      },
      immediate: true,
    },
    "models.fld_11713_44": {
      handler(newVal) {
        console.log(newVal);
        this.handleChangeSuggestion();
      },
      immediate: true,
    },
    "models.fld_11713_55": {
      handler(newVal) {
        this.handleChangeModels();
        this.handleChangeSecondModels();
        this.handleChangeSuggestion();
      },
      immediate: true,
    },
    "models.fld_11690_26": {
      handler(newVal) {
        this.handleChangeModels();
        this.handleChangeSuggestion();
      },
      immediate: true,
    },
    "models.fld_11690_27": {
      handler(newVal) {
        this.handleChangeModels();
      },
      immediate: true,
    },
    "models.fld_11690_29": {
      handler(newVal) {
        this.handleChangeModels();
        this.handleChangeSecondModels();
        this.handleChangeSuggestion();
      },
      immediate: true,
    },
    "models.fld_11690_28": {
      handler(newVal) {
        this.handleChangeModels();
        this.handleChangeSecondModels();
        this.handleChangeSuggestion();
      },
      immediate: true,
    },
    "models.fld_11713_76": {
      handler(newVal) {
        this.handleChangeSecondModels();
      },
      immediate: true,
    },
    "models.fld_11713_77": {
      handler(newVal) {
        this.handleChangeSecondModels();
      },
      immediate: true,
    },
    "models.fld_11713_56": {
      handler(newVal) {
        this.handleChangeThirdModels();
      },
      immediate: true,
    },
    "models.fld_11690_33": {
      handler(newVal) {
        this.handleChangeThirdModels();
      },
      immediate: true,
    },
    "models.fld_11690_34": {
      handler(newVal) {
        this.handleChangeThirdModels();
      },
      immediate: true,
    },
    "models.fld_11690_35": {
      handler(newVal) {
        this.handleChangeThirdModels();
      },
      immediate: true,
    },
    "models.fld_11690_36": {
      handler(newVal) {
        this.handleChangeThirdModels();
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 数字转成汉字
     * @params num === 要转换的数字
     * @return 汉字
     * */
    toChinesNum(num) {
      let changeNum = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
      ];
      let unit = ["", "十", "百", "千", "万"];
      num = parseInt(num);
      let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        let newArr = [];
        strArr.forEach((item, index) => {
          newArr.unshift(
            item === "0" ? changeNum[item] : changeNum[item] + unit[index]
          );
        });
        let numArr = [];
        newArr.forEach((m, n) => {
          if (m !== "零") numArr.push(n);
        });
        if (newArr.length > 1) {
          newArr.forEach((m, n) => {
            if (newArr[newArr.length - 1] === "零") {
              if (n <= numArr[numArr.length - 1]) {
                newNum += m;
              }
            } else {
              newNum += m;
            }
          });
        } else {
          newNum = newArr[0];
        }

        return newNum;
      };
      let overWan = Math.floor(num / 10000);
      let noWan = num % 10000;
      if (noWan.toString().length < 4) {
        noWan = "0" + noWan;
      }
      return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
    getRegrade() {
      let h1 = this.models.fld_11713_54 || 0; // 原坡高
      let d = this.models.fld_11713_53 || 0; // 坡宽
      let θ1 = +this.models.fld_11713_55 || 0; // 坡度
      let fld_11713_44 = this.models.fld_11713_44 || "否"; // 坡体性质
      let regrade = 0; //放坡量
      if (fld_11713_44 === "土质坡") {
        regrade =
          (0.5 *
            h1 *
            0.5 *
            d *
            (h1 / Math.tan((θ1 * Math.PI) / 180)) *
            3.141592 -
            0.5 *
              (((2 * h1) / 3) * Math.tan((θ1 * Math.PI) / 180)) *
              0.5 *
              d *
              (h1 / Math.tan((θ1 * Math.PI) / 180)) *
              3.141592) *
          29;
      }
      if (fld_11713_44 === "岩质坡") {
        regrade =
          (0.5 *
            h1 *
            0.5 *
            d *
            (h1 / Math.tan((θ1 * Math.PI) / 180)) *
            3.141592 -
            0.5 *
              ((4 * h1) / (5 * Math.tan((θ1 * Math.PI) / 180))) *
              0.5 *
              d *
              (h1 / Math.tan((θ1 * Math.PI) / 180)) *
              3.141592) *
          51;
      }
      return regrade;
    },
    getRetainingWall() {
      let h1 = this.models.fld_11713_54 || 0; // 原坡高
      let d = this.models.fld_11713_53 || 0; // 坡宽
      let retainingWall = 0; //挡土墙长度
      if (h1 < 5) {
        retainingWall = d * 408;
      }
      if (h1 >= 5) {
        retainingWall = d * 510;
      }
      return retainingWall;
    },
    getIntercepting() {
      let h1 = this.models.fld_11713_54 || 0; // 原坡高
      let d = this.models.fld_11713_53 || 0; // 坡宽
      let θ1 = this.models.fld_11713_55 || 0; // 坡度
      let fld_11713_44 = this.models.fld_11713_44 || "否"; // 坡体性质
      let intercepting = 0; //截水沟
      if (fld_11713_44 === "土质坡") {
        intercepting =
          ((3.141592 *
            ((0.5 * (d ^ 2)) / 4 +
              (1.444 * (h1 ^ 2)) / (Math.tan((θ1 * Math.PI) / 180) ^ 2))) ^
            2) *
          256;
      }
      if (fld_11713_44 === "岩质坡") {
        intercepting =
          ((3.141592 *
            ((0.5 * (d ^ 2)) / 4 +
              (1.742 * (h1 ^ 2)) / (Math.tan((θ1 * Math.PI) / 180) ^ 2))) ^
            2) *
          256;
      }
      return intercepting;
    },
    // 排水沟
    getDrain() {
      let d = this.models.fld_11713_53 || 0; // 坡宽
      let drain = 0; //排水沟
      drain = d * 256;
      return drain;
    },
    getRankDrain() {
      let d = this.models.fld_11713_53 || 0; // 坡宽
      let drain = 0; //排水沟
      drain = 1.667 * d * 256;
      return drain;
    },
    // 防护网
    getGrassDefense() {
      let h1 = this.models.fld_11713_54 || 0; // 原坡高
      let d = this.models.fld_11713_53 || 0; // 坡宽
      let θ1 = this.models.fld_11713_55 || 0; // 坡度
      let fld_11713_44 = this.models.fld_11713_44 || "否"; // 坡体性质
      let type = 1.202;
      let price = 60;
      if (fld_11713_44 === "岩质坡") {
        type = 1.281;
      }
      return (
        ((0.5 * d) / 2) * type * (h1 / Math.tan((θ1 * Math.PI) / 180)) * price
      );
    },
    getDefense() {
      let h1 = this.models.fld_11713_54 || 0; // 原坡高
      let d = this.models.fld_11713_53 || 0; // 坡宽
      let θ1 = this.models.fld_11713_55 || 0; // 坡度
      let fld_11713_44 = this.models.fld_11713_44 || "否"; // 坡体性质
      let type = 1.202;
      let price = 185;
      if (fld_11713_44 === "岩质坡") {
        type = 1.281;
      }
      return (
        ((0.5 * d) / 2) * type * (h1 / Math.tan((θ1 * Math.PI) / 180)) * price
      );
    },

    handleChangeSuggestion() {
      let fld_11713_55 = this.models.fld_11713_55 || 0; // 坡度
      let fld_11690_26 = this.models.fld_11690_26 || 0; // 切坡高
      let fld_11690_29 = this.models.fld_11690_29 || "否"; // 易滑
      let fld_11690_28 = this.models.fld_11690_28 || "否"; // 土墙

      let currentTemplate = "";
      let currentOrder = 1;

      if (fld_11713_55 < 45 && fld_11690_26 > 10) {
        currentTemplate = `方案一: 坡脚距设置距离为>5m\n\n`;
      }
      if (
        fld_11713_55 < 45 &&
        fld_11690_26 > 10 &&
        fld_11690_29 === "否" &&
        fld_11690_28 === "是"
      ) {
        currentTemplate = `方案一: 坡脚距设置距离为4~5m\n\n`;
      }
      if (fld_11713_55 < 45 && fld_11690_26 <= 10) {
        currentTemplate = `方案一: 坡脚距设置距离为>5m\n\n`;
      }
      if (
        fld_11713_55 < 45 &&
        fld_11690_26 <= 10 &&
        fld_11690_29 === "否" &&
        fld_11690_28 === "是"
      ) {
        currentTemplate = `方案一: 坡脚距设置距离为3~5m\n\n`;
      }
      if (fld_11713_55 >= 45 && fld_11690_26 <= 5) {
        currentTemplate = `方案一: 坡脚距设置距离为>2m\n\n`;
      }
      if (fld_11713_55 >= 45 && fld_11690_26 <= 5 && fld_11690_29 === "否") {
        currentTemplate = `方案一: 坡脚距设置距离为1~2m\n\n`;
      }
      if (fld_11713_55 >= 45 && fld_11690_26 > 5 && fld_11690_26 <= 10) {
        currentTemplate = `方案一: 坡脚距设置距离为>5m\n\n`;
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 5 &&
        fld_11690_26 <= 10 &&
        fld_11690_29 === "否"
      ) {
        currentTemplate = `方案一: 坡脚距设置距离为3~5m\n\n`;
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 5 &&
        fld_11690_26 <= 10 &&
        fld_11690_29 === "否" &&
        fld_11690_28 === "是"
      ) {
        currentTemplate = `方案一: 坡脚距设置距离为2~3m\n\n`;
      }
      if (fld_11713_55 >= 45 && fld_11690_26 > 10) {
        currentTemplate = `方案一: 坡脚距设置距离为>8m\n\n`;
      }
      if (fld_11713_55 >= 45 && fld_11690_26 > 10 && fld_11690_29 === "否") {
        currentTemplate = `方案一: 坡脚距设置距离为5~8m\n\n`;
      }

      if (currentTemplate !== "") {
        currentOrder = 2;
      }

      this.models.fld_11690_38 = currentTemplate;
      if (!this.models.fld_11713_54 || isNaN(this.models.fld_11713_54)) return;
      if (!this.models.fld_11713_44) return;

      const options1 = [
        {
          label:
            "对坡面进行削坡减载，开挖坡比为1: 1.50，坡度<40°。（适用于有开挖条件的斜坡处）",
          key: [],
        },
        {
          label:
            "坡脚处设置浆砌石护脚墙，墙高大于1.5米，基础埋深不少于0.5米，建议墙体做好排水孔预留。 (适用于坡脚距大于等于3m以上）",
          key: [{ title: "护土墙", value: "getRetainingWall" }],
        },
        {
          label:
            "坡体外围设置截水沟，坡脚设置排水沟，水沟接入居民区既有排水系统(所有斜坡都需要，除非是已修砌截排水沟)",
          key: [
            { title: "截水沟", value: "getIntercepting" },
            { title: "排水沟", value: "getDrain" },
          ],
        },
        {
          label: "坡面进行三维网植草防护。",
          key: [{ title: "三维网植草防护", value: "getGrassDefense" }],
        },
        {
          label:
            "对坡面进行削坡减载，开挖坡比为1: 1.25，坡度<45°。（适用于有开挖条件的斜坡处）",
          key: [],
        },
        {
          label: "坡面局部进行挂GPS2主动防护网。",
          key: [{ title: "GPS2主动防护网", value: "getDefense" }],
        },
      ];
      const options2 = [
        {
          label:
            "对坡体进行分级放坡处理，分级坡高5m，开挖坡比为1: 1.50，坡度<40°，分级平台宽≥2m。",
          key: [{ title: "分级放坡处理", value: "getRegrade" }],
        },
        {
          label:
            "坡脚处沿坡面设置浆砌石护脚墙，墙高大于2米，基础埋深不少于0.5米，墙体预留排水孔。 (除非坡脚距小于等于2m，其他都要设置)",
          key: [{ title: "护土墙", value: "getRetainingWall" }],
        },
        {
          label:
            "坡体外围设置截水沟，坡脚及分级平台处设置排水沟，水沟接入居民区既有排水系统。 (所有斜坡都需要)",
          key: [
            { title: "截水沟", value: "getIntercepting" },
            { title: "分级排水沟", value: "getRankDrain" },
          ],
        },
        {
          label: "坡面进行三维网植草防护。",
          key: [{ title: "三维网植草防护", value: "getGrassDefense" }],
        },
        {
          label:
            "对坡体进行分级放坡处理，分级坡高5m，开挖坡比1:1.25，坡度<45°，分级平台宽≥2m。",
          key: [{ title: "分级放坡处理", value: "getRegrade" }],
        },
        {
          label: "坡面局部进行挂GPS2主动防护网。",
          key: [{ title: "GPS2主动防护网", value: "getDefense" }],
        },
      ];
      const options3 = [
        {
          label:
            "对坡体进行分级放坡处理，分级坡高5m，开挖坡比为1: 1.50，坡度<40°，分级平台宽≥2m。",
          key: [{ title: "分级放坡处理", value: "getRegrade" }],
        },
        {
          label:
            "坡脚处沿坡面设置浆砌石护脚墙，墙高大于2米，基础埋深不少于0.5米，墙体预留排水孔。 (除非坡脚距小于等于2m，其他都要设置)",
          key: [{ title: "护土墙", value: "getRetainingWall" }],
        },
        {
          label:
            "坡体外围设置截水沟，坡脚及分级平台处设置排水沟，水沟接入居民区既有排水系统。 (所有斜坡都需要)",
          key: [
            { title: "截水沟", value: "getIntercepting" },
            { title: "分级排水沟", value: "getRankDrain" },
          ],
        },
        { label: "坡面三维网植草防护。", key: [] },
        {
          label:
            "(坡脚距小于3m时)对坡体进行整体向后开挖，保证其建筑物距坡脚预留3-4米安全距离。 ",
          key: [],
        },
        {
          label:
            "对坡体进行分级放坡处理，分级坡高5m，开挖坡比为1:1.25，坡度<45°，分级平台宽≥2m。",
          key: [{ title: "分级放坡处理", value: "getRegrade" }],
        },
        { label: "坡面进行挂GPS2主动防护网。", key: [] },
      ];
      const options4 = [
        {
          label:
            "对坡体进行分级放坡处理，分级坡高5-7m，开挖坡比为1: 1.50，坡度<40°，分级平台宽≥2m。",
          key: [{ title: "分级放坡处理", value: "getRegrade" }],
        },
        {
          label:
            "坡脚处沿坡面设置浆砌石护脚墙，墙高大于2米，基础埋深不少于0.5米，墙体预留排水孔。 (所有斜坡都需要)",
          key: [{ title: "护土墙", value: "getRetainingWall" }],
        },
        {
          label:
            "坡体外围设置截水沟，坡脚及分级平台处设置排水沟，水沟接入居民区既有排水系统。 (所有斜坡都需要)",
          key: [
            { title: "截水沟", value: "getIntercepting" },
            { title: "分级排水沟", value: "getRankDrain" },
          ],
        },
        { label: "坡面进行三维网植草防护。", key: ["getGrassDefense"] },
        {
          label:
            "(坡脚距小于3m时)对坡体进行整体向后开挖，保证其建筑物距坡脚预留3米以上安全距离。 ",
          key: [],
        },
        {
          label:
            "对坡体进行分级放坡处理，分级坡高5-7m，开挖坡比为1: 1.25，坡度<45°，分级平台宽≥2m。",
          key: [{ title: "分级放坡处理", value: "getRegrade" }],
        },
        {
          label: "坡面进行挂GPS2主动防护网。",
          key: [{ title: "GPS2主动防护网", value: "getDefense" }],
        },
      ];
      const optionsTotal = {
        options1,
        options2,
        options3,
        options4,
      };
      // 改变意见
      const optionsTemplate = {
        "<5土质坡": {
          value: "options1",
          options: [
            [0, 2],
            [1, 2],
            [0, 1, 2],
            [0, 1, 2, 3],
          ],
        },
        "<5岩质坡": {
          value: "options1",
          options: [
            [0, 2],
            [0, 2, 3],
          ],
        },
        "5-7土质坡": {
          value: "options2",
          options: [
            [0, 1, 2],
            [0, 1, 2, 3],
          ],
        },
        "5-7岩质坡": {
          value: "options2",
          options: [
            [4, 1, 2],
            [4, 1, 2, 5],
          ],
        },
        "7-9土质坡": {
          value: "options3",
          options: [
            [0, 1, 2, 4],
            [0, 1, 2, 3, 4],
          ],
        },
        "7-9岩质坡": {
          value: "options3",
          options: [
            [5, 1, 2, 4],
            [5, 1, 2, 6, 4],
          ],
        },
        "9土质坡": {
          value: "options4",
          options: [
            [0, 1, 2, 4],
            [0, 1, 2, 3, 4],
          ],
        },
        "9岩质坡": {
          value: "options4",
          options: [
            [5, 1, 2, 4],
            [5, 1, 2, 6, 4],
          ],
        },
      };
      // ------------------------
      let currentKey = "<5" + this.models.fld_11713_44;
      let currentValue = "options1";

      let current = +this.models.fld_11713_54 || 0;
      if (current >= 5 && current < 7) {
        currentKey = "5-7" + this.models.fld_11713_44;
      } else if (current >= 7 && current < 9) {
        currentKey = "7-9" + this.models.fld_11713_44;
      } else if (current >= 9) {
        currentKey = "9" + this.models.fld_11713_44;
      }
      currentValue = optionsTemplate[currentKey].value;
      optionsTemplate[currentKey].options.forEach((items, indexs) => {
        currentTemplate += `方案${this.toChinesNum(
          indexs + currentOrder
        )}: 【工程造价区间为： $GCZJ_TOTAL${indexs + currentOrder}$ 】\n`;
        let price = 0;
        let priceOptions = [];
        items.forEach((item, index) => {
          currentTemplate += `${index + 1}. ${
            optionsTotal[currentValue][item].label
          }`;
          // 计算造价
          if (optionsTotal[currentValue][item].key.length > 0) {
            optionsTotal[currentValue][item].key.forEach((itemss) => {
              priceOptions.push(itemss.value);
              currentTemplate += `【${
                itemss.title
              } 工程造价区间为：${this.getOptionsPrice([itemss.value])}】`;
            });
            // currentTemplate += this.getOptionsPrice(optionsTotal[currentValue][item].key)
          }
          currentTemplate += "\n";
        });
        price = this.getOptionsPrice(priceOptions);
        currentTemplate =
          currentTemplate.replace(
            `$GCZJ_TOTAL${indexs + currentOrder}$`,
            price
          ) + "\n";
      });
      this.models.fld_11690_38 = currentTemplate;
    },
    getOptionsPrice(priceOptions) {
      let totoalPrice = 0; // 总造价
      priceOptions.forEach((item) => {
        totoalPrice += this[item]();
      });
      let current = `${(totoalPrice * 0.8).toFixed(2)}元 ~ ${(
        totoalPrice * 1.2
      ).toFixed(2)}元`;
      return current || 0;
    },
    //校验风险等级
    handleChangeModels() {
      this.models.fld_11690_31 = "";
      let fld_11713_55 = this.models.fld_11713_55
        ? +this.models.fld_11713_55
        : 0;
      let fld_11690_26 = this.models.fld_11690_26
        ? +this.models.fld_11690_26
        : 0;
      let fld_11690_27 = this.models.fld_11690_27
        ? +this.models.fld_11690_27
        : 0;
      let fld_11690_28 = this.models.fld_11690_28 || "否";
      let fld_11690_29 = this.models.fld_11690_29 || "否";
      if (fld_11713_55 < 45 && fld_11690_27 > 5) {
        this.models.fld_11690_31 = "低风险";
      }
      if (
        fld_11713_55 < 45 &&
        fld_11690_27 <= 5 &&
        fld_11690_29 == "否" &&
        fld_11690_28 == "是"
      ) {
        this.models.fld_11690_31 = "低风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 <= 5 &&
        fld_11690_27 <= 2 &&
        fld_11690_29 <= "否"
      ) {
        this.models.fld_11690_31 = "低风险";
      }
      if (fld_11713_55 >= 45 && fld_11690_26 <= 5 && fld_11690_27 > 2) {
        this.models.fld_11690_31 = "低风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 5 &&
        fld_11690_26 <= 10 &&
        fld_11690_27 <= 3 &&
        fld_11690_29 == "否" &&
        fld_11690_28 == "是"
      ) {
        this.models.fld_11690_31 = "低风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 5 &&
        fld_11690_26 <= 10 &&
        fld_11690_27 > 3 &&
        fld_11690_27 <= 5 &&
        fld_11690_29 == "否"
      ) {
        this.models.fld_11690_31 = "低风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 5 &&
        fld_11690_26 <= 10 &&
        fld_11690_27 > 5
      ) {
        this.models.fld_11690_31 = "低风险";
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 10 &&
        fld_11690_27 > 5 &&
        fld_11690_27 <= 8 &&
        fld_11690_29 == "否"
      ) {
        this.models.fld_11690_31 = "低风险";
      }
      if (fld_11713_55 >= 45 && fld_11690_26 > 10 && fld_11690_27 > 8) {
        this.models.fld_11690_31 = "低风险";
      }

      if (
        fld_11713_55 < 45 &&
        fld_11690_27 <= 5 &&
        fld_11690_29 == "否" &&
        fld_11690_28 == "否"
      ) {
        this.models.fld_11690_31 = "中风险";
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 <= 5 &&
        fld_11690_27 <= 2 &&
        fld_11690_29 == "是"
      ) {
        this.models.fld_11690_31 = "中风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 5 &&
        fld_11690_26 <= 10 &&
        fld_11690_27 > 3 &&
        fld_11690_27 <= 5 &&
        fld_11690_29 == "是"
      ) {
        this.models.fld_11690_31 = "中风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 5 &&
        fld_11690_26 <= 10 &&
        fld_11690_27 <= 3 &&
        fld_11690_29 == "否" &&
        fld_11690_28 == "否"
      ) {
        this.models.fld_11690_31 = "中风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 10 &&
        fld_11690_27 > 5 &&
        fld_11690_27 <= 8 &&
        fld_11690_29 == "是"
      ) {
        this.models.fld_11690_31 = "中风险";
      }

      if (fld_11713_55 < 45 && fld_11690_27 <= 5 && fld_11690_29 == "是") {
        this.models.fld_11690_31 = "高风险";
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 5 &&
        fld_11690_26 <= 10 &&
        fld_11690_27 <= 3 &&
        fld_11690_29 == "是"
      ) {
        this.models.fld_11690_31 = "高风险";
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 10 &&
        fld_11690_27 <= 5 &&
        fld_11690_29 == "否"
      ) {
        this.models.fld_11690_31 = "高风险";
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11690_26 > 10 &&
        fld_11690_27 <= 5 &&
        fld_11690_29 == "是"
      ) {
        this.models.fld_11690_31 = "极高风险";
      }
    },
    handleChangeSecondModels() {
      this.models.fld_11713_43 = "";
      let fld_11713_55 = this.models.fld_11713_55
        ? +this.models.fld_11713_55
        : 0;
      let fld_11713_77 = this.models.fld_11713_77
        ? +this.models.fld_11713_77
        : 0;
      let fld_11713_76 = this.models.fld_11713_76
        ? +this.models.fld_11713_76
        : 0;
      let fld_11690_28 = this.models.fld_11690_28 || "否";
      let fld_11690_29 = this.models.fld_11690_29 || "否";
      if (fld_11713_55 < 45 && fld_11713_76 > 5) {
        this.models.fld_11713_43 = "低风险";
      }
      if (
        fld_11713_55 < 45 &&
        fld_11713_76 <= 5 &&
        fld_11690_29 == "否" &&
        fld_11690_28 == "是"
      ) {
        this.models.fld_11713_43 = "低风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 <= 5 &&
        fld_11713_76 <= 2 &&
        fld_11690_29 <= "否"
      ) {
        this.models.fld_11713_43 = "低风险";
      }
      if (fld_11713_55 >= 45 && fld_11713_77 <= 5 && fld_11713_76 > 2) {
        this.models.fld_11713_43 = "低风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 > 5 &&
        fld_11713_77 <= 10 &&
        fld_11713_76 <= 3 &&
        fld_11690_29 == "否" &&
        fld_11690_28 == "是"
      ) {
        this.models.fld_11713_43 = "低风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 > 5 &&
        fld_11713_77 <= 10 &&
        fld_11713_76 > 3 &&
        fld_11713_76 <= 5 &&
        fld_11690_29 == "否"
      ) {
        this.models.fld_11713_43 = "低风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 > 5 &&
        fld_11713_77 <= 10 &&
        fld_11713_76 > 5
      ) {
        this.models.fld_11713_43 = "低风险";
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 > 10 &&
        fld_11713_76 > 5 &&
        fld_11713_76 <= 8 &&
        fld_11690_29 == "否"
      ) {
        this.models.fld_11713_43 = "低风险";
      }
      if (fld_11713_55 >= 45 && fld_11713_77 > 10 && fld_11713_76 > 8) {
        this.models.fld_11713_43 = "低风险";
      }

      if (
        fld_11713_55 < 45 &&
        fld_11713_76 <= 5 &&
        fld_11690_29 == "否" &&
        fld_11690_28 == "否"
      ) {
        this.models.fld_11713_43 = "中风险";
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 <= 5 &&
        fld_11713_76 <= 2 &&
        fld_11690_29 == "是"
      ) {
        this.models.fld_11713_43 = "中风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 > 5 &&
        fld_11713_77 <= 10 &&
        fld_11713_76 > 3 &&
        fld_11713_76 <= 5 &&
        fld_11690_29 == "是"
      ) {
        this.models.fld_11713_43 = "中风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 > 5 &&
        fld_11713_77 <= 10 &&
        fld_11713_76 <= 3 &&
        fld_11690_29 == "否" &&
        fld_11690_28 == "否"
      ) {
        this.models.fld_11713_43 = "中风险";
      }

      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 > 10 &&
        fld_11713_76 > 5 &&
        fld_11713_76 <= 8 &&
        fld_11690_29 == "是"
      ) {
        this.models.fld_11713_43 = "中风险";
      }

      if (fld_11713_55 < 45 && fld_11713_76 <= 5 && fld_11690_29 == "是") {
        this.models.fld_11713_43 = "高风险";
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 > 5 &&
        fld_11713_77 <= 10 &&
        fld_11713_76 <= 3 &&
        fld_11690_29 == "是"
      ) {
        this.models.fld_11713_43 = "高风险";
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 > 10 &&
        fld_11713_76 <= 5 &&
        fld_11690_29 == "否"
      ) {
        this.models.fld_11713_43 = "高风险";
      }
      if (
        fld_11713_55 >= 45 &&
        fld_11713_77 > 10 &&
        fld_11713_76 <= 5 &&
        fld_11690_29 == "是"
      ) {
        this.models.fld_11713_43 = "极高风险";
      }
    },
    handleChangeThirdModels() {
      this.models.fld_11690_37 = "";
      let fld_11713_56 = this.models.fld_11713_56
        ? +this.models.fld_11713_56
        : 0;
      let fld_11690_33 = this.models.fld_11690_33
        ? +this.models.fld_11690_33
        : 0;
      let fld_11690_34 = this.models.fld_11690_34
        ? +this.models.fld_11690_34
        : 0;
      let fld_11690_35 = this.models.fld_11690_35 || "否";
      let fld_11690_36 = this.models.fld_11690_36 || "否";
      if (fld_11713_56 < 45 && fld_11690_34 > 5) {
        this.models.fld_11690_37 = "低风险";
      }
      if (
        fld_11713_56 < 45 &&
        fld_11690_34 <= 5 &&
        fld_11690_36 == "否" &&
        fld_11690_35 == "是"
      ) {
        this.models.fld_11690_37 = "低风险";
      }

      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 <= 5 &&
        fld_11690_34 <= 2 &&
        fld_11690_36 <= "否"
      ) {
        this.models.fld_11690_37 = "低风险";
      }
      if (fld_11713_56 >= 45 && fld_11690_33 <= 5 && fld_11690_34 > 2) {
        this.models.fld_11690_37 = "低风险";
      }

      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 > 5 &&
        fld_11690_33 <= 10 &&
        fld_11690_34 <= 3 &&
        fld_11690_36 == "否" &&
        fld_11690_35 == "是"
      ) {
        this.models.fld_11690_37 = "低风险";
      }

      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 > 5 &&
        fld_11690_33 <= 10 &&
        fld_11690_34 > 3 &&
        fld_11690_34 <= 5 &&
        fld_11690_36 == "否"
      ) {
        this.models.fld_11690_37 = "低风险";
      }

      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 > 5 &&
        fld_11690_33 <= 10 &&
        fld_11690_34 > 5
      ) {
        this.models.fld_11690_37 = "低风险";
      }
      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 > 10 &&
        fld_11690_34 > 5 &&
        fld_11690_34 <= 8 &&
        fld_11690_36 == "否"
      ) {
        this.models.fld_11690_37 = "低风险";
      }
      if (fld_11713_56 >= 45 && fld_11690_33 > 10 && fld_11690_34 > 8) {
        this.models.fld_11690_37 = "低风险";
      }

      if (
        fld_11713_56 < 45 &&
        fld_11690_34 <= 5 &&
        fld_11690_36 == "否" &&
        fld_11690_35 == "否"
      ) {
        this.models.fld_11690_37 = "中风险";
      }
      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 <= 5 &&
        fld_11690_34 <= 2 &&
        fld_11690_36 == "是"
      ) {
        this.models.fld_11690_37 = "中风险";
      }

      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 > 5 &&
        fld_11690_33 <= 10 &&
        fld_11690_34 > 3 &&
        fld_11690_34 <= 5 &&
        fld_11690_36 == "是"
      ) {
        this.models.fld_11690_37 = "中风险";
      }

      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 > 5 &&
        fld_11690_33 <= 10 &&
        fld_11690_34 <= 3 &&
        fld_11690_36 == "否" &&
        fld_11690_35 == "否"
      ) {
        this.models.fld_11690_37 = "中风险";
      }

      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 > 10 &&
        fld_11690_34 > 5 &&
        fld_11690_34 <= 8 &&
        fld_11690_36 == "是"
      ) {
        this.models.fld_11690_37 = "中风险";
      }

      if (fld_11713_56 < 45 && fld_11690_34 <= 5 && fld_11690_36 == "是") {
        this.models.fld_11690_37 = "高风险";
      }
      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 > 5 &&
        fld_11690_33 <= 10 &&
        fld_11690_34 <= 3 &&
        fld_11690_36 == "是"
      ) {
        this.models.fld_11690_37 = "高风险";
      }
      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 > 10 &&
        fld_11690_34 <= 5 &&
        fld_11690_36 == "否"
      ) {
        this.models.fld_11690_37 = "高风险";
      }
      if (
        fld_11713_56 >= 45 &&
        fld_11690_33 > 10 &&
        fld_11690_34 <= 5 &&
        fld_11690_36 == "是"
      ) {
        this.models.fld_11690_37 = "极高风险";
      }
    },
  },
};
