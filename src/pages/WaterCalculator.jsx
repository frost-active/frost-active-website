import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Height mapping for averages (in inches)
const avgHeights = {
  "Asia Avg — 5'5”": 65,
  "Europe Avg — 5'8”": 68,
  "US Avg — 5'9”": 69,
};

// Google Sheets Web App URL 
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw2pjoG5UvFmWYuQUwXZwmuN4f-S0odsKNU6Do9yIukTJGRvkTB51-W0Xr3KkhR4Pk0uA/exec';

// Helper function to send data to Google Sheets
async function sendDataToGoogleSheet(data) {
  try {
    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    // Fail silently
  }
}

// Improved, robust calculation logic
function calculateWaterNeeded({
  gender,
  age,
  weight,
  feet,
  inches,
  cmHeight,
  avgHeight,
  activity,
  climate,
  sources,
  intakeGuess,
  customIntake,
}) {
  const weightKg = parseFloat(weight);
  const ageNum = Number(age);
  if (Number.isNaN(weightKg) || weightKg <= 0) {
    return { error: "Invalid weight" };
  }
  const L_TO_ML = 1000;

  const perKg = (() => {
    if (ageNum < 18) return 45;
    if (ageNum > 65) return 30;
    if (gender === "Male") return 40;
    if (gender === "Female") return 35;
    return 37.5;
  })();
  const baseMl = weightKg * perKg;

  const activityMap = { Sedentary: 0.0, Light: 0.08, Moderate: 0.18, High: 0.3, Extreme: 0.5 };
  const climateMap = { Temperate: 0.0, Tropical: 0.12, Cold: 0.05 };

  const activityAddMl = baseMl * (activityMap[activity] ?? 0);
  const climateAddMl = baseMl * (climateMap[climate] ?? 0);

  let heightInInches = 0;
  if (avgHeight && avgHeight.includes("Avg")) {
    const match = avgHeight.match(/(\d+)'(\d+)/);
    if (match) heightInInches = parseInt(match[1]) * 12 + parseInt(match[2]);
  } else if (cmHeight) {
    const cm = parseFloat(cmHeight);
    if (!Number.isNaN(cm) && cm > 0) {
      heightInInches = cm / 2.54;
    }
  } else if (feet && inches) {
    const f = parseInt(feet, 10);
    const i = parseInt(inches, 10);
    if (!Number.isNaN(f) && !Number.isNaN(i)) {
      heightInInches = f * 12 + i;
    }
  }
  let heightAdjMl = 0;
  if (heightInInches > 74) heightAdjMl = baseMl * 0.06;
  else if (heightInInches > 0 && heightInInches < 60) heightAdjMl = baseMl * -0.05;

  const sourceMlMap = {
    Tea: 150, Coffee: 150, Juice: 180, Milk: 180, Soda: 150,
    "Other(Food, Fruits, Vegetables)": 400,
  };
  const rawSourceMl = (sources || []).reduce((sum, s) => sum + (sourceMlMap[s] || 0), 0);

  const totalNeededMl = baseMl + activityAddMl + climateAddMl + heightAdjMl;
  const sourceMax = totalNeededMl * 0.2;
  const actualSourceMl = Math.min(rawSourceMl, sourceMax);

  let intakeL = 0;
  if (intakeGuess === "I Know My intake") intakeL = Number(customIntake) || 0;
  else if (intakeGuess.includes("~1.5")) intakeL = 1.5;
  else if (intakeGuess.includes("1.25")) intakeL = 1.25;
  else if (intakeGuess.includes("750")) intakeL = 0.75;

  const intakeMl = Math.max(0, intakeL * L_TO_ML);
  const finalIntakeMl = intakeMl + actualSourceMl;
  const lackingMl = Math.max(0, totalNeededMl - finalIntakeMl);
  const percent = Math.min(100, Math.round((finalIntakeMl / totalNeededMl) * 100));

  const roundL = (ml) => Math.round((ml / L_TO_ML) * 100) / 100;
  return {
    totalNeeded: roundL(totalNeededMl),
    currentIntake: roundL(finalIntakeMl),
    lacking: roundL(lackingMl),
    percent,
    _debug: {
      baseMl: Math.round(baseMl),
      activityAddMl: Math.round(activityAddMl),
      climateAddMl: Math.round(climateAddMl),
      heightAdjMl: Math.round(heightAdjMl),
      sourceMlTotal: Math.round(rawSourceMl),
      actualSourceMl: Math.round(actualSourceMl),
      totalNeededMl: Math.round(totalNeededMl),
      perKg,
      heightInInches: Math.round(heightInInches),
    },
  };
}
// Disease risk mapping
function getHydrationRisks(percent) {
  if (percent >= 90) {
    return {
      level: "Optimal Hydration",
      diseases: [],
      message:
        "You are well hydrated and at minimal risk for dehydration-related conditions.",
      ref: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2908954/",
    };
  } else if (percent >= 70) {
    return {
      level: "Mild Dehydration",
      diseases: [
        "Headaches",
        "Fatigue, decreased alertness",
        "Constipation",
        "Urinary tract infections (UTIs)",
        "Kidney stone risk",
      ],
      message:
        "You are mildly dehydrated. Research shows increased risk of headaches, constipation, UTIs, and the formation of kidney stones.",
      ref: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2908954/",
    };
  } else if (percent >= 50) {
    return {
      level: "Moderate Dehydration",
      diseases: [
        "All of the above, plus:",
        "Cognitive impairment",
        "Reduced physical performance",
        "Dry skin and mucous membranes",
      ],
      message:
        "You are moderately dehydrated. Risks include cognitive impairment, higher risk of kidney stones and UTIs, and reduced physical and mental performance.",
      ref: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2908954/",
    };
  } else {
    return {
      level: "Severe Dehydration",
      diseases: [
        "All of the above, plus:",
        "Heat-related illnesses (heat exhaustion, heatstroke)",
        "Acute kidney injury",
        "Hypotension, rapid heart rate",
        "Electrolyte imbalance",
      ],
      message:
        "You are severely dehydrated! This can lead to heat-related illness, acute kidney injury, and dangerous electrolyte imbalances.",
      ref: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2908954/",
    };
  }
}

// Micro-messages mapping
const microMessages = {
  Male: {
    Sedentary: [
      "Strong minds start with small moves.",
      "Time to build your base.",
      "Frost’s got your back, boss.",
    ],
    Light: [
      "You’re warming up the engine.",
      "Big wins start with small walks.",
      "Momentum is building — stay on it!",
    ],
    Moderate: [
      "You’re owning your pace.",
      "That’s how legends train.",
      "Frost keeps your edge sharp.",
    ],
    High: [
      "Built different. Stay sharp.",
      "Hydrated men go further.",
      "You’re in the zone — power up!",
    ],
    Extreme: [
      "Alpha grind. Frost fuels it.",
      "Beast mode = full hydration.",
      "Unstoppable. Stay lethal, stay hydrated.",
    ],
  },
  Female: {
    Sedentary: [
      "Queen, it starts with a sip.",
      "Your glow-up starts here.",
      "Frost’s here to energize you.",
    ],
    Light: [
      "Walking tall, walking strong.",
      "Hydration = confidence in motion.",
      "You’re on your way, shine on!",
    ],
    Moderate: [
      "Grace. Grit. Greatness.",
      "She moves, she conquers.",
      "You’re building strength daily.",
    ],
    High: [
      "Powerful. Poised. Unstoppable.",
      "You train hard. Frost fuels harder.",
      "Strong is your new standard.",
    ],
    Extreme: [
      "Alpha queen. No limits.",
      "Slaying. Sweating. Hydrated.",
      "Power is feminine — drink up.",
    ],
  },
};

const getMicroMessage = (gender, activity) => {
  if (!gender || !activity) return "";
  const messages = microMessages[gender][activity];
  return messages ? messages[Math.floor(Math.random() * messages.length)] : "";
};

export default function WaterCalculator() {
  const [form, setForm] = useState({
    gender: "",
    age: "",
    weight: "",
    feet: "",
    inches: "",
    cmHeight: "",
    heightUnit: "", // no default selected
    avgHeight: "",
    activity: "",
    climate: "",
    intakeGuess: "",
    customIntake: "",
    email: "",
    sources: [],
  });
  const [showCustomIntake, setShowCustomIntake] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState({});
  const leftRef = useRef(null);
  const bottomRef = useRef(null);
  const [stickBottom, setStickBottom] = useState(false);
  const resultBoxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setStickBottom(true);
        else setStickBottom(false);
      },
      { threshold: 0.1 }
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, []);

  const feetFilled = form.feet !== "" && form.feet != null;
  const inchesFilled = form.inches !== "" && form.inches != null;
  const cmFilled = form.cmHeight !== "" && form.cmHeight != null;
  const isAnyHeightFieldFilled = feetFilled || inchesFilled || cmFilled;
  const isAvgHeightSelected = !!form.avgHeight;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Height unit change
    if (name === "heightUnit") {
      // clear the unit-specific inputs when switching units but DO NOT clear avgHeight
      // (avgHeight should remain visible & usable regardless of unit)
      setForm((prev) => ({
        ...prev,
        heightUnit: value,
        feet: "",
        inches: "",
        cmHeight: "",
        // avgHeight intentionally preserved so avg selection doesn't disappear when switching units
      }));
      // Clear height-related errors
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.feet;
        delete copy.inches;
        delete copy.cmHeight;
        delete copy.avgHeight;
        delete copy.heightUnit;
        return copy;
      });
      return;
    }

    // Height fields (feet/inches)
    if (["feet", "inches"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        cmHeight: "", // clear cm when editing feet/inches
        avgHeight: "",
      }));
      // Clear all height-related errors immediately
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.feet;
        delete copy.inches;
        delete copy.cmHeight;
        delete copy.avgHeight;
        return copy;
      });
      return;
    }

    // CM height
    if (name === "cmHeight") {
      setForm((prev) => ({ ...prev, cmHeight: value, feet: "", inches: "", avgHeight: "" }));
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.cmHeight;
        delete copy.feet;
        delete copy.inches;
        delete copy.avgHeight;
        return copy;
      });
      return;
    }

    // Average height
    if (name === "avgHeight") {
      setForm((prev) => ({
        ...prev,
        avgHeight: value,
        feet: "",
        inches: "",
        cmHeight: "",
      }));
      // Clear all height-related errors immediately
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.feet;
        delete copy.inches;
        delete copy.cmHeight;
        delete copy.avgHeight;
        return copy;
      });
      return;
    }

    // Custom intake field
    if (name === "customIntake") {
      setForm((prev) => ({ ...prev, customIntake: value }));
      // Clear related error immediately
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.customIntake;
        return copy;
      });
      return;
    }

    // General fields
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the specific field error immediately
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };


  const handleSourceToggle = (source) => {
    setForm((prev) => {
      const isSelected = prev.sources.includes(source);
      const updated = isSelected
        ? prev.sources.filter((s) => s !== source)
        : [...prev.sources, source];
      return { ...prev, sources: updated };
    });
  };

  function validateEmail(email) {
    if (!email || typeof email !== "string") return false;
    // Basic structure check
    // - local part: no spaces, some allowed characters
    // - single @
    // - domain: labels separated by dots, TLD at least 2 letters and only letters (no digits like c0m)
    // This is intentionally strict about TLD being alphabetic to catch obfuscations like "c0m".
    const emailTrim = email.trim();
    if (emailTrim.includes(" ")) return false;
    const parts = emailTrim.split("@");
    if (parts.length !== 2) return false;
    const [local, domain] = parts;
    if (!local || !domain) return false;
    // local part basic validation
    const localValid = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local);
    if (!localValid) return false;
    // domain validation: at least one dot, labels valid, TLD letters only (2+)
    if (!domain.includes(".")) return false;
    const domainLabels = domain.split(".");
    if (domainLabels.some((lab) => !/^[A-Za-z0-9-]+$/.test(lab) || lab.startsWith("-") || lab.endsWith("-"))) return false;
    const tld = domainLabels[domainLabels.length - 1];
    if (!/^[A-Za-z]{2,}$/.test(tld)) return false; // ensures no digits like c0m
    return true;
  }

  function validateForm() {
    const newErrors = {};
    const {
      gender,
      age,
      weight,
      activity,
      climate,
      intakeGuess,
      customIntake,
      email,
      feet,
      inches,
      cmHeight,
      avgHeight,
      heightUnit,
    } = form;

    // Gender
    if (!gender) {
      newErrors.gender = "Please select your gender.";
    }

    // Age
    if (!age && age !== 0) {
      newErrors.age = "Please enter your age.";
    } else {
      const ageNum = parseInt(age, 10);
      if (Number.isNaN(ageNum) || ageNum < 2 || ageNum > 120) {
        newErrors.age = "Enter an age between 2 and 120.";
      }
    }

    // Weight
    if (!weight && weight !== 0) {
      newErrors.weight = "Please enter your weight.";
    } else {
      const wt = parseFloat(weight);
      if (Number.isNaN(wt) || wt < 20 || wt > 500) {
        newErrors.weight = "Enter a realistic weight (20 - 500 kg).";
      }
    }

    // Height validation depends on selected unit but avgHeight should be accepted in either unit.
    const feetProvided = feet !== "" && feet != null;
    const inchesProvided = inches !== "" && inches != null;
    const cmProvided = cmHeight !== "" && cmHeight != null;
    const avgProvided = avgHeight !== "" && avgHeight != null;

    // If no unit selected and no avg provided -> require unit selection
    if (!heightUnit && !avgProvided) {
      newErrors.heightUnit = "Please select a height unit (ft or cm) or choose an average height.";
    } else {
      // If avg provided we accept it regardless of heightUnit
      if (avgProvided) {
        // nothing to validate here for avg option
      } else if (heightUnit === "ft") {
        // Require either avgHeight OR both feet & inches
        if (!avgProvided && !(feetProvided && inchesProvided)) {
          newErrors.feet = "Please provide height either as feet & inches or choose an average.";
          newErrors.inches = "Please provide height either as feet & inches or choose an average.";
          newErrors.avgHeight = "Or select an average height.";
        } else if (avgProvided && (feetProvided || inchesProvided)) {
          // both specified -> error
          newErrors.feet = "Choose either exact height or an average — not both.";
          newErrors.inches = "Choose either exact height or an average — not both.";
          newErrors.avgHeight = "Choose either exact height or an average — not both.";
        } else if (feetProvided && inchesProvided) {
          // validate numeric ranges
          const f = parseInt(feet, 10);
          const i = parseInt(inches, 10);
          if (Number.isNaN(f) || f < 2 || f > 8) {
            newErrors.feet = "Feet must be between 2 and 8.";
          }
          if (Number.isNaN(i) || i < 0 || i > 11) {
            newErrors.inches = "Inches must be between 0 and 11.";
          }
        }
      } else if (heightUnit === "cm") {
        // In cm mode accept either cm input OR avgHeight
        if (!cmProvided && !avgProvided) {
          newErrors.cmHeight = "Please enter your height in centimeters or choose an average.";
          newErrors.avgHeight = "Or select an average height.";
        } else if (cmProvided && avgProvided) {
          newErrors.cmHeight = "Choose either exact height or an average — not both.";
          newErrors.avgHeight = "Choose either exact height or an average — not both.";
        } else if (cmProvided) {
          const cm = parseFloat(cmHeight);
          if (Number.isNaN(cm) || cm < 50 || cm > 250) {
            newErrors.cmHeight = "Enter a realistic height (50 - 250 cm).";
          }
        }
      }
    }

    // Activity
    if (!activity) {
      newErrors.activity = "Please select your activity level.";
    }

    // Climate
    if (!climate) {
      newErrors.climate = "Please choose your climate.";
    }

    // Intake guess & custom intake
    if (!intakeGuess) {
      newErrors.intakeGuess = "Please choose an intake estimate.";
    } else if (intakeGuess === "I Know My intake") {
      if (customIntake === "" || customIntake === null || customIntake === undefined) {
        newErrors.customIntake = "Please enter your daily intake in liters.";
      } else {
        const ci = Number(customIntake);
        if (Number.isNaN(ci) || ci < 0 || ci > 20) {
          newErrors.customIntake = "Enter a realistic intake (0 - 20 L).";
        }
      }
    }

    // Email
    if (!email) {
      newErrors.email = "Please enter your email.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address (e.g. user@example.com).";
    }

    setErrors(newErrors);
    // If there are errors, hide previous result
    if (Object.keys(newErrors).length > 0) {
      setShowResult(false);
      return false;
    }
    return true;
  }

  function handleCalculate() {
    // Reset previous errors
    setErrors({});
    const ok = validateForm();
    if (!ok) {
      // Validation has already set inline errors
      return;
    }

    const resultObj = calculateWaterNeeded(form);
    setResult(resultObj);
    setShowResult(true);

    // Build explicit height info to ensure Google Sheet receives the centimeter value (and both representations).
    // This ensures cmHeight is always sent when user enters it, and also includes the computed heights used.
    const computeUsedHeights = (fForm, debugFromResult) => {
      let usedHeightInches = null;
      let usedHeightCm = null;
      let usedHeightDisplay = "";
      // prefer avgHeight if selected
      if (fForm.avgHeight) {
        const match = fForm.avgHeight.match(/(\d+)'(\d+)/);
        if (match) {
          usedHeightInches = parseInt(match[1], 10) * 12 + parseInt(match[2], 10);
          usedHeightCm = Number((usedHeightInches * 2.54).toFixed(2));
          usedHeightDisplay = fForm.avgHeight;
        }
      } else if (fForm.cmHeight) {
        const cm = parseFloat(fForm.cmHeight);
        if (!Number.isNaN(cm)) {
          usedHeightCm = cm;
          usedHeightInches = cm / 2.54;
          usedHeightDisplay = `${cm} cm`;
        }
      } else if (fForm.feet && fForm.inches) {
        const f = parseInt(fForm.feet, 10);
        const i = parseInt(fForm.inches, 10);
        if (!Number.isNaN(f) && !Number.isNaN(i)) {
          usedHeightInches = f * 12 + i;
          usedHeightCm = Number((usedHeightInches * 2.54).toFixed(2));
          usedHeightDisplay = `${f}'${i}"`;
        }
      } else if (debugFromResult && debugFromResult.heightInInches) {
        // fallback to debug height if calculation returned something (rare)
        usedHeightInches = debugFromResult.heightInInches;
        usedHeightCm = Number((usedHeightInches * 2.54).toFixed(2));
        usedHeightDisplay = `${usedHeightCm} cm`;
      }
      return {
        usedHeightInches: usedHeightInches !== null ? Number(usedHeightInches.toFixed(2)) : "",
        usedHeightCm: usedHeightCm !== null ? Number(usedHeightCm.toFixed(2)) : "",
        usedHeightDisplay,
      };
    };

    const heights = computeUsedHeights(form, resultObj && resultObj._debug ? resultObj._debug : null);

    // Explicit payload: include form fields and explicit height data so Google Sheet columns receive cm value reliably.
    const payload = {
      // original form fields
      gender: form.gender,
      age: form.age,
      weight: form.weight,
      feet: form.feet,
      inches: form.inches,
      cmHeight: form.cmHeight, // explicitly include user's entered cmHeight (if any)
      heightUnit: form.heightUnit,
      avgHeight: form.avgHeight,
      activity: form.activity,
      climate: form.climate,
      intakeGuess: form.intakeGuess,
      customIntake: form.customIntake,
      email: form.email,
      sources: form.sources,
      // computed/used heights to make sure sheet gets a consistent value
      usedHeightInches: heights.usedHeightInches,
      usedHeightCm: heights.usedHeightCm,
      usedHeightDisplay: heights.usedHeightDisplay,
      // result and debug
      result: resultObj,
      timestamp: new Date().toISOString(),
    };

    sendDataToGoogleSheet(payload);

    setTimeout(() => {
      if (resultBoxRef.current) {
        const element = resultBoxRef.current;
        const offset = 100;
        const topPosition =
          element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  }

  function IntakeGraph({ percent }) {
    let color =
      percent >= 80 ? "#51C77D" : percent >= 50 ? "#F7B731" : "#EA5455";
    return (
      <div className="w-full mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span>Low</span>
          <span>Medium</span>
          <span>Optimal</span>
        </div>
        <div className="relative h-6 bg-[#E0E7EF] rounded overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded"
            style={{
              width: `${percent}%`,
              background: color,
              transition: "width 0.6s cubic-bezier(.4,2,.2,1)",
            }}
          />
          <div className="absolute top-0 left-0 h-full w-full text-center flex items-center justify-center font-bold text-[#021637] text-sm">
            {percent}% of goal
          </div>
        </div>
      </div>
    );
  }

  function ComparisonBar({ yourIntake, goal }) {
    const maxValue = Math.max(yourIntake, goal, 0.1);
    const yourIntakeHeight = Math.round((yourIntake / maxValue) * 180);
    const goalHeight = Math.round((goal / maxValue) * 180);

    const intakeColor =
      yourIntake >= goal
        ? "#51C77D"
        : yourIntake / goal > 0.8
        ? "#F7B731"
        : "#EA5455";
    const goalColor = "#389ED7";

    return (
      <div className="mt-6 mb-2">
        <div className="text-base font-bold mb-10 text-center">Daily Water Gap: You vs Your Body’s Needs</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "32px", height: "200px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                height: yourIntakeHeight,
                width: "50px",
                background: intakeColor,
                borderRadius: "12px 12px 0 0",
                boxShadow: `0 2px 8px ${intakeColor}44`,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                position: "relative",
                transition: "height 0.5s",
              }}
              title={`Your Intake: ${yourIntake} L`}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-22px",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  color: intakeColor,
                }}
              >
                {yourIntake} L
              </span>
            </div>
            <span className="mt-2 text-[#389ED7] font-semibold text-sm">Your Intake</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                height: goalHeight,
                width: "50px",
                background: goalColor,
                borderRadius: "12px 12px 0 0",
                boxShadow: "0 2px 8px #389ED744",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                position: "relative",
                transition: "height 0.5s",
              }}
              title={`Goal: ${goal} L`}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-22px",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  color: goalColor,
                }}
              >
                {goal} L
              </span>
            </div>
            <span className="mt-2 text-[#389ED7] font-semibold text-sm">Body Need's</span>
          </div>
        </div>
       <div className="text-lg text-center mt-2 font-bold">
  {yourIntake < goal ? (
    <>
      <span style={{ color: "#EA5455" }}>
        You're Lagging by {Math.round((goal - yourIntake) * 100) / 100} L/day
      </span>
      <br />
      <span className="italic"style={{ color: "#000000" }}>Means: </span>
      <span  className="italic" style ={{ color: "#000000" }}>
       That’s how kidney stones form, cells weaken, and brain fog begins.
      </span>
    </>
  ) : (
    <span style={{ color: "#51C77D" }}>You're meeting or exceeding your goal!</span>
  )}
</div>

      </div>
    );
  }

  function CalculationBreakdown({ debug, sources }) {
    if (!debug) return null;
    return (
      <details className="mt-2 mb-2 bg-blue-50 border-l-4 border-blue-400 p-2 rounded text-xs text-[#021637]">
        <summary className="cursor-pointer font-bold">How did we calculate this?</summary>
        <div>
          <div>Base: {debug.baseMl} ml</div>
          <div>Activity: +{debug.activityAddMl} ml</div>
          <div>Climate: +{debug.climateAddMl} ml</div>
          <div>Height: {debug.heightAdjMl} ml</div>
          <div>Sources: -{debug.sourceMlTotal} ml ({sources && sources.length ? sources.join(", ") : "none"})</div>
          <div>Total: {debug.totalNeededMl} ml</div>
          <div className="mt-1">Based on {debug.perKg} ml/kg for your age/gender</div>
          <div className="mt-1">Height (in): {debug.heightInInches}</div>
        </div>
      </details>
    );
  }

  function HydrationRiskBox({ percent }) {
    const risk = getHydrationRisks(percent);
    return (
      <div className="my-4 p-3 rounded bg-red-50 border-l-4 border-red-400">
        <div className="font-bold text-red-700 mb-1">{risk.level}</div>
        <div className="text-sm text-red-900 mb-1">{risk.message}</div>
        {risk.diseases.length > 0 && (
          <ul className="list-disc ml-5 text-left">
            {risk.diseases.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="mt-16 min-h-screen flex flex-col md:flex-row font-['Roboto'] relative">
      {/* ---------- LEFT SIDE ---------- */}
      <div
        ref={leftRef}
        className={`md:mt-8 md:w-1/2 w-full bg-white flex flex-col items-center justify-center text-center p-8 
        ${
          stickBottom
            ? "md:absolute md:bottom-0 md:top-auto"
            : "md:fixed md:top-0 md:left-0 md:h-full"
        }`}
        style={{ transition: "all 0.4s ease" }}
      >
        <div className="flex flex-col items-center">
          <img
            src="/images/waterdrop.png"
            alt="Water Drop"
            className="w-32 md:w-40 mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-[#021637]">
            WATER INTAKE <br /> CALCULATOR
          </h1>
          <p className="text-[#021637] mt-3 text-base md:text-base">
            Discover how much water you're missing — and how to fix it
          </p>
        </div>
      </div>

      {/* ---------- RIGHT SIDE ---------- */}
      <div className="md:ml-[50%] w-full md:w-1/2 bg-[#389ED7] text-white flex justify-center items-start p-6 md:p-10 overflow-y-auto">
        <form
          className="w-full max-w-md space-y-5 pb-0"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Gender */}
          <div>
            <label className="block text-sm mb-2">Body Parameters</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, gender: "Male" }))
                }
                className={`flex-1 py-2 rounded font-medium ${
                  form.gender === "Male"
                    ? "bg-[#021637] text-white"
                    : "bg-white text-[#021637] border border-white"
                }`}
              >
                MALE
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, gender: "Female" }))
                }
                className={`flex-1 py-2 rounded font-medium ${
                  form.gender === "Female"
                    ? "bg-[#021637] text-white"
                    : "bg-white text-[#021637] border border-white"
                }`}
              >
                FEMALE
              </button>
            </div>
            {errors.gender && (
              <div className="text-red-600 text-sm mt-1 text-left">{errors.gender}</div>
            )}
          </div>

          {/* Age & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Age (years)</label>
              <input
                type="number"
                name="age"
                placeholder="e.g. 25"
                value={form.age}
                onChange={handleChange}
                className="w-full p-2 rounded text-black"
                min={2}
                max={120}
              />
              {errors.age && (
                <div className="text-red-600 text-sm mt-1 text-left">{errors.age}</div>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                placeholder="Your last weight (kg)"
                value={form.weight}
                onChange={handleChange}
                className="w-full p-2 rounded text-black"
                min={20}
                max={500}
              />
              {errors.weight && (
                <div className="text-red-600 text-sm mt-1 text-left">{errors.weight}</div>
              )}
            </div>
          </div>

          {/* Height Unit Selector */}
          <div>
            <label className="block text-sm mb-1">Height Unit</label>
            <div className="flex gap-3">
              <label className={`p-2 rounded cursor-pointer ${form.heightUnit === "ft" ? "bg-white text-[#021637]" : "bg-[#389ED7] text-white border border-white"}`}>
                <input
                  type="radio"
                  name="heightUnit"
                  value="ft"
                  checked={form.heightUnit === "ft"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Feet / Inches
              </label>
              <label className={`p-2 rounded cursor-pointer ${form.heightUnit === "cm" ? "bg-white text-[#021637]" : "bg-[#389ED7] text-white border border-white"}`}>
                <input
                  type="radio"
                  name="heightUnit"
                  value="cm"
                  checked={form.heightUnit === "cm"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Centimeters
              </label>
            </div>
            {errors.heightUnit && (
              <div className="text-red-600 text-sm mt-1 text-left">{errors.heightUnit}</div>
            )}
          </div>

          {/* Height */}
          <div>
            {/* <label className="block text-sm mb-1">Height</label>*/}

            {form.heightUnit === "ft" ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    name="feet"
                    placeholder="Feet (2-8)"
                    value={form.feet}
                    onChange={handleChange}
                    className="p-2 rounded text-black w-full"
                    disabled={isAvgHeightSelected}
                    min={2}
                    max={8}
                  />
                  <input
                    type="number"
                    name="inches"
                    placeholder="Inches (0-11)"
                    value={form.inches}
                    onChange={handleChange}
                    className="p-2 rounded text-black w-full"
                    disabled={isAvgHeightSelected}
                    min={0}
                    max={11}
                  />
                </div>
                {(errors.feet || errors.inches) && (
                  <div className="text-red-600 text-sm mt-1 text-left">
                    {errors.feet && <div>{errors.feet}</div>}
                    {errors.inches && <div>{errors.inches}</div>}
                  </div>
                )}
              </>
            ) : form.heightUnit === "cm" ? (
              <>
                <div>
                  <input
                    type="number"
                    name="cmHeight"
                    placeholder="Height in cm (e.g. 170)"
                    value={form.cmHeight}
                    onChange={handleChange}
                    className="p-2 rounded text-black w-full"
                    min={50}
                    max={250}
                    disabled={isAvgHeightSelected}
                  />
                </div>
                {errors.cmHeight && (
                  <div className="text-red-600 text-sm mt-1 text-left">{errors.cmHeight}</div>
                )}
              </>
            ) : (
              <>
                {/* No unit selected yet - show helper text 
                <div className="text-white/80 text-sm italic">Select a height unit above to enter your height, or choose an average below.</div> */}
              </>
            )}
          </div>

          {/* Don’t know height (avg) - show for both units (and even if unit not selected).
              It will be disabled when user types any exact height (ft/in or cm). */}
          <div>
            <label className="block text-sm mb-1">
              Don’t know your exact height?
            </label>
            <select
              className="p-2 rounded w-full text-black"
              name="avgHeight"
              value={form.avgHeight}
              onChange={handleChange}
              disabled={isAnyHeightFieldFilled}
            >
              <option value="">Select average (Optional)</option>
              <option value="Asia Avg — 5'5”">Asia Avg — 5.5</option>
              <option value="Europe Avg — 5'8”">Europe Avg — 5.8</option>
              <option value="US Avg — 5'9”">US Avg — 5.9</option>
            </select>
            {errors.avgHeight && (
              <div className="text-red-600 text-sm mt-1 text-left">{errors.avgHeight}</div>
            )}
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm mb-1">Activity Level</label>
            <div className="relative flex justify-between items-center mt-2">
              <div className="absolute left-2 right-1 h-0.5 bg-white z-0 top-5 transform -translate-y-1/2" />
              {[
                { emoji: "🪑", label: "Sedentary" },
                { emoji: "🚶", label: "Light" },
                { emoji: "🏃", label: "Moderate" },
                { emoji: "🏋️", label: "High" },
                { emoji: "🔥", label: "Extreme" },
              ].map((level) => {
                const isActive = form.activity === level.label;
                return (
                  <div
                    key={level.label}
                    className="relative flex flex-col items-center group"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          activity: level.label,
                        }))
                      }
                      className={`relative z-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                        ${
                          isActive
                            ? "bg-white border-white text-[#389ED7] scale-125 shadow-lg"
                            : "border-white bg-[#389ED7] text-white hover:scale-110 hover:shadow-md"
                        }`}
                      style={{
                        width: isActive ? "3rem" : "2.5rem",
                        height: isActive ? "3rem" : "2.5rem",
                      }}
                    >
                      <span
                        className={`text-2xl transition-transform duration-300 ${
                          isActive ? "scale-125" : "group-hover:scale-110"
                        }`}
                      >
                        {level.emoji}
                      </span>
                    </button>
                    <span className="mt-2 text-xs text-center">
                      {level.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Micro-message display */}
            {form.gender && form.activity && (
              <div className="mt-3 p-1 bg-white text-[#021637] rounded text-sm text-center font-medium shadow italic">
                {getMicroMessage(form.gender, form.activity)}
              </div>
            )}
            {errors.activity && (
              <div className="text-red-600 text-sm mt-1 text-left">{errors.activity}</div>
            )}
          </div>

          {/* Climate */}
          <div>
            <label className="block text-sm mb-1">Climate</label>
            <select
              name="climate"
              value={form.climate}
              onChange={handleChange}
              className="p-2 rounded w-full text-black"
            >
              <option value="">Choose Climate</option>
              <option value="Temperate">🌤️ Temperate</option>
              <option value="Tropical">☀️ Tropical</option>
              <option value="Cold">❄️ Cold</option>
            </select>
            {errors.climate && (
              <div className="text-red-600 text-sm mt-1 text-left">{errors.climate}</div>
            )}
          </div>

          {/* Water intake */}
          <div>
            <label className="block text-sm mb-1">
              Your current water intake (liters/day)
            </label>
            <select
              name="intakeGuess"
              value={form.intakeGuess}
              onChange={(e) => {
                const value = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  intakeGuess: value,
                  customIntake:
                    value === "I Know My intake" ? prev.customIntake : "",
                }));
                setShowCustomIntake(value === "I Know My intake");
                // clear intake related errors
                setErrors((prev) => {
                  const copy = { ...prev };
                  delete copy.intakeGuess;
                  delete copy.customIntake;
                  return copy;
                });
              }}
              className="p-2 rounded w-full text-black"
            >
              <option value="">Choose an estimate:</option>
              <option value="I Know My intake">I Know My Intake</option>
              <option value="I carry a 750 ml bottle (usually drink once)">
                I carry a 750 ml bottle (usually drink once)
              </option>
              <option value="I refill my 750 ml bottle once (~1.5 L)">
                I refill my 750 ml bottle once (~1.5 L)
              </option>
              <option value="I drink 5 glasses/day (250ml each = ~1.25 L)">
                I drink 5 glasses/day (250ml each = ~1.25 L)
              </option>
            </select>
            {errors.intakeGuess && (
              <div className="text-red-600 text-sm mt-1 text-left">{errors.intakeGuess}</div>
            )}
            {showCustomIntake && (
              <div className="mt-3">
                <label className="block text-sm mb-1">
                  Enter your Daily Water Intake (liters)
                </label>
                <input
                  type="number"
                  name="customIntake"
                  placeholder="e.g. 1.5 (liters)"
                  value={form.customIntake || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-black"
                  min={0}
                  step={0.01}
                />
                {errors.customIntake && (
                  <div className="text-red-600 text-sm mt-1 text-left">{errors.customIntake}</div>
                )}
              </div>
            )}
          </div>

          {/* Water Sources */}
          <div>
            <label className="block text-sm mb-2">
              Select additional water sources
            </label>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {[
                "Tea",
                "Coffee",
                "Juice",
                "Milk",
                "Soda",
                "Other(Food, Fruits, Vegetables)",
              ].map((src) => (
                <label key={src} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.sources.includes(src)}
                    onChange={() => handleSourceToggle(src)}
                    className="accent-[#021637]"
                  />
                  {src}
                </label>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 rounded text-black"
              type="email"
            />
            {errors.email && (
              <div className="text-red-600 text-sm mt-1 text-left">{errors.email}</div>
            )}
            <p className="italic text-xs">*Please enter your e-mail to get free 7-day hydration tips directly to your inbox!</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              className="flex-1 bg-[#0E254E] py-2 rounded text-white font-medium"
              onClick={handleCalculate}
            >
              Calculate
            </button>
            
            <button
              className="flex-1 bg-white text-[#389ED7]  py-2 rounded font-medium"
            >
              <a href="/prelaunch">Join Early Access</a>
            </button>
          </div>

            {/* Result Box */}
              <div
              ref={resultBoxRef}
              className="bg-white text-[#021637] text-center p-4 rounded mt-4 shadow-md">

            <p className="font-semibold text-lg">Your Result</p>
            {!showResult && Object.keys(errors).length === 0 && (
              <p className="text-sm mt-1">
                Enter all the fields and Calculate
              </p>
            )}
            {showResult && result && (
              <div>
                <div className="mt-2 mb-2">
                  <IntakeGraph percent={result.percent} />
                </div>
                <div className="mt-3 text-left">
                  
                  <p className="italic text-[#389ED7] text-center mt-2">
                    {getMicroMessage(form.gender, form.activity)}
                  </p>
                </div>
                {/* Comparison bar graph */}
                <ComparisonBar yourIntake={result.currentIntake} goal={result.totalNeeded} />
                { /*<CalculationBreakdown debug={result._debug} sources={form.sources} /> */}
                {/* Disease risk box */}
                <HydrationRiskBox percent={result.percent} />
                <div className="mt-3 text-xs text-[#0E254E]">
                 <span className="text-red-600">*</span>Your 7-day hydration plan is on the way!
                     Check your inbox to start achieving your water intake goals — one day at a time.<br />
                   <br />
                 <p className="italic text-sm"> Stay hydrated for peak performance!</p>
                </div>
              </div>
            )}
            {Object.keys(errors).length > 0 && (
              <div className="text-red-600 text-sm mt-2 text-left">
                Please correct the highlighted fields above.
              </div>
            )}
          </div>

          {/* Footer Trigger */}
          <div
            ref={bottomRef}
            className="text-center text-sm text-white/80 mt-8 tracking-wide"
          >
            Powered by{" "}
            <span className="font-semibold text-white">Frostactive</span> •
            Mindful Hydration for Busy Lives
          </div>
        </form>
      </div>
    </div>
  );
}