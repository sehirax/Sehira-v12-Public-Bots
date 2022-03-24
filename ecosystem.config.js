module.exports = {
    apps: [
      {
        name: "Mainframe",
        namespace: "SEHIRA",
        script: 'acar.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Moderation"
      },
      {
        name: "Requirements",
        namespace: "SEHIRA",
        script: 'acar.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Requirements"
      },
      {
        name: "Statistics",
        namespace: "SEHIRA",
        script: 'acar.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Statistics"
      },
      {
        name: "FW_ONE",
        namespace: "SEHIRA",
        script: 'acar.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Firewall_ONE"
      },
      {
        name: "FW_TWO",
        namespace: "SEHIRA",
        script: 'acar.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Firewall_TWO"
      },
      {
        name: "FW_THREE",
        namespace: "SEHIRA",
        script: 'acar.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Firewall_THREE"
      },
      {
        name: "FW_FOUR",
        namespace: "SEHIRA",
        script: 'acar.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Firewall_FOUR"
      },
      {
        name: "FW_DIST",
        namespace: "SEHIRA",
        script: 'acar.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./FIREW_Distributors"
      },
    ]
  };