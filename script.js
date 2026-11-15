function getStatus(actual, target) {

    let percentage = (actual / target) * 100;

    if (percentage >= 100) {
        return {
            text: "Tercukupi",
            className: "good"
        };
    }

    if (percentage >= 70) {
        return {
            text: "Hampir Tercukupi",
            className: "warning"
        };
    }

    return {
        text: "Belum Tercukupi",
        className: "bad"
    };
}


function setStatus(elementId, status) {

    let element = document.getElementById(elementId);

    element.textContent = status.text;

    element.className = "status " + status.className;
}


function checkHealth() {

    let nama = document.getElementById("nama").value;
    let usia = Number(document.getElementById("usia").value);
    let gender = document.getElementById("gender").value;

    let tinggi = Number(
        document.getElementById("tinggi").value
    );

    let berat = Number(
        document.getElementById("berat").value
    );

    let air = Number(
        document.getElementById("air").value
    );

    let tidur = Number(
        document.getElementById("tidur").value
    );

    let aktivitas = Number(
        document.getElementById("aktivitas").value
    );

    let buahSayur = Number(
        document.getElementById("buahSayur").value
    );

    let makan = Number(
        document.getElementById("makan").value
    );


    // Validasi data

    if (
        nama === "" ||
        usia <= 0 ||
        gender === "" ||
        tinggi <= 0 ||
        berat <= 0 ||
        air < 0 ||
        tidur < 0 ||
        aktivitas < 0 ||
        buahSayur < 0 ||
        makan < 0
    ) {

        alert("Silakan isi semua data dengan benar.");

        return;
    }


    /*
     * Perkiraan kebutuhan air.
     * Rumus sederhana:
     * berat badan × 0,035 liter
     */

    let targetAir = berat * 0.035;

    /*
     * Target sederhana untuk kebutuhan harian.
     */

    let targetTidur = 8;
    let targetAktivitas = 60;
    let targetBuahSayur = 5;
    let targetMakan = 3;


    // Menentukan status

    let airStatus =
        getStatus(air, targetAir);

    let tidurStatus =
        getStatus(tidur, targetTidur);

    let aktivitasStatus =
        getStatus(aktivitas, targetAktivitas);

    let buahStatus =
        getStatus(buahSayur, targetBuahSayur);

    let makanStatus =
        getStatus(makan, targetMakan);


    // Menghitung persentase

    let airPercent =
        Math.min((air / targetAir) * 100, 100);

    let tidurPercent =
        Math.min((tidur / targetTidur) * 100, 100);

    let aktivitasPercent =
        Math.min((aktivitas / targetAktivitas) * 100, 100);

    let buahPercent =
        Math.min((buahSayur / targetBuahSayur) * 100, 100);

    let makanPercent =
        Math.min((makan / targetMakan) * 100, 100);


    let totalPercent =
        (
            airPercent +
            tidurPercent +
            aktivitasPercent +
            buahPercent +
            makanPercent
        ) / 5;


    totalPercent =
        Math.round(totalPercent);


    // Menampilkan nama

    document.getElementById("hasilNama")
        .textContent = nama;


    // Menampilkan data

    document.getElementById("airAktual")
        .textContent = air.toFixed(1);

    document.getElementById("airTarget")
        .textContent = targetAir.toFixed(1);

    document.getElementById("tidurAktual")
        .textContent = tidur;

    document.getElementById("aktivitasAktual")
        .textContent = aktivitas;

    document.getElementById("buahAktual")
        .textContent = buahSayur;

    document.getElementById("makanAktual")
        .textContent = makan;


    // Menampilkan status

    setStatus("airStatus", airStatus);
    setStatus("tidurStatus", tidurStatus);
    setStatus("aktivitasStatus", aktivitasStatus);
    setStatus("buahStatus", buahStatus);
    setStatus("makanStatus", makanStatus);


    // Menampilkan skor

    document.getElementById("score")
        .textContent = totalPercent + "%";


    // Menentukan status keseluruhan

    let statusOverall = "";
    let statusText = "";

    if (totalPercent >= 90) {

        statusOverall =
            "Kebutuhan harianmu sudah tercukupi.";

        statusText =
            "Bagus! Sebagian besar kebutuhan harian sudah terpenuhi.";

    } else if (totalPercent >= 70) {

        statusOverall =
            "Kebutuhan harianmu hampir tercukupi.";

        statusText =
            "Beberapa kebutuhan masih perlu ditingkatkan.";

    } else {

        statusOverall =
            "Kebutuhan harianmu belum tercukupi.";

        statusText =
            "Masih ada beberapa kebutuhan yang perlu diperhatikan.";

    }


    document.getElementById("statusOverall")
        .textContent = statusOverall;

    document.getElementById("statusText")
        .textContent = statusText;


    // Membuat saran

    let saran = [];

    if (airPercent < 100) {
        saran.push("tingkatkan konsumsi air secara bertahap");
    }

    if (tidurPercent < 100) {
        saran.push("usahakan waktu tidur yang cukup");
    }

    if (aktivitasPercent < 100) {
        saran.push("tambahkan aktivitas fisik");
    }

    if (buahPercent < 100) {
        saran.push("tambahkan buah dan sayur");
    }

    if (makanPercent < 100) {
        saran.push("perhatikan pola makan utama");
    }


    if (saran.length === 0) {

        document.getElementById("saran")
            .textContent =
            "Semua indikator sudah mencapai target. Pertahankan pola hidup yang baik.";

    } else {

        document.getElementById("saran")
            .textContent =
            "Coba " + saran.join(", ") + ".";

    }


    // Menampilkan hasil

    document.getElementById("hasil")
        .classList.remove("hidden");


    // Scroll ke hasil

    document.getElementById("hasil")
        .scrollIntoView({
            behavior: "smooth"
        });
}